import { createHash } from "node:crypto";
import { ConversationMode, ExcelVersion } from "@prisma/client";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const OPENAI_MODEL = "gpt-4o-mini";
const ESTIMATED_CENTS_PER_1K_TOKENS = 1;

export type GenerateExcelAnswerInput = {
  question: string;
  mode: ConversationMode;
  excelVersion: ExcelVersion;
};

export type GenerateExcelAnswerResult = {
  answer: string;
  source: "openai" | "cache";
  model: string;
  openAiCalled: boolean;
  tokensUsed?: number;
  costInCents?: number;
};

export class MissingOpenAiKeyError extends Error {
  constructor() {
    super("OPENAI_API_KEY não configurada.");
    this.name = "MissingOpenAiKeyError";
  }
}

function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ").toLowerCase();
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function buildCacheKey(input: GenerateExcelAnswerInput) {
  const normalizedQuestion = normalizeQuestion(input.question);
  const questionHash = hashValue(normalizedQuestion);

  return {
    questionHash,
    cacheKey: hashValue(`${input.mode}:${input.excelVersion}:${questionHash}`),
  };
}

function getModeInstruction(mode: ConversationMode) {
  const instructions: Record<ConversationMode, string> = {
    FORMULA: "Gere uma fórmula pronta para uso quando a pergunta pedir solução por fórmula.",
    EXPLAIN: "Explique a fórmula, recurso ou raciocínio em partes curtas e úteis.",
    FIX: "Corrija a fórmula enviada, explique o erro provável e entregue a versão corrigida.",
    CONVERT: "Converta a fórmula, lógica ou recurso entre versões ou ferramentas quando solicitado.",
    VBA: "Responda com foco em VBA quando fizer sentido, incluindo código objetivo e observações.",
    POWER_QUERY: "Responda com foco em Power Query quando fizer sentido, incluindo etapas ou M.",
    OFFICE_SCRIPT: "Responda com foco em Office Scripts quando fizer sentido, incluindo TypeScript objetivo.",
  };

  return instructions[mode];
}

function getExcelVersionLabel(excelVersion: ExcelVersion) {
  const labels: Record<ExcelVersion, string> = {
    EXCEL_2013: "Excel 2013",
    EXCEL_2016: "Excel 2016",
    EXCEL_2019: "Excel 2019",
    EXCEL_2021: "Excel 2021",
    EXCEL_365: "Excel 365",
    GOOGLE_SHEETS: "Google Sheets",
  };

  return labels[excelVersion];
}

function buildSystemPrompt(input: GenerateExcelAnswerInput) {
  return `
Você é o ExcelGPT Brasil, uma IA especialista em Excel para usuários brasileiros.
Responda sempre em português do Brasil.
Seu foco é Excel, fórmulas, correção de fórmulas, explicação de fórmulas, planilhas, produtividade, VBA, Power Query, Office Scripts e Google Sheets quando selecionado.
Não aja como chatbot genérico.

Contexto obrigatório:
- Modo solicitado: ${input.mode}.
- Versão selecionada: ${getExcelVersionLabel(input.excelVersion)}.
- Instrução do modo: ${getModeInstruction(input.mode)}

Regras de resposta:
- Tente incluir resposta direta, fórmula/código quando aplicável, explicação curta e compatibilidade com a versão selecionada.
- Quando gerar fórmulas para Excel em português, use nomes de funções em português e separador ";".
- Se a solução depender de recursos modernos do Excel 365, alerte quando houver impacto em Excel 2013, 2016, 2019 ou 2021.
- Quando uma função não existir na versão selecionada, ofereça alternativa compatível quando possível.
- Se a pergunta for sobre Google Sheets, deixe claras diferenças de sintaxe ou disponibilidade.
- Não invente funções ou recursos. Se faltar contexto, peça apenas o mínimo necessário.
`.trim();
}

function estimateCostInCents(tokensUsed?: number) {
  if (!tokensUsed) {
    return undefined;
  }

  return Math.max(1, Math.ceil((tokensUsed / 1000) * ESTIMATED_CENTS_PER_1K_TOKENS));
}

export async function generateExcelAnswer(
  input: GenerateExcelAnswerInput,
): Promise<GenerateExcelAnswerResult> {
  const { cacheKey, questionHash } = buildCacheKey(input);

  const cachedAnswer = await prisma.aiCache.findUnique({
    where: { cacheKey },
  });

  if (cachedAnswer) {
    await prisma.aiCache.update({
      where: { id: cachedAnswer.id },
      data: {
        hitCount: {
          increment: 1,
        },
      },
    });

    return {
      answer: cachedAnswer.answer,
      source: "cache",
      model: OPENAI_MODEL,
      openAiCalled: false,
      tokensUsed: 0,
      costInCents: 0,
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new MissingOpenAiKeyError();
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(input),
      },
      {
        role: "user",
        content: input.question,
      },
    ],
  });

  const answer =
    completion.choices[0]?.message?.content?.trim() ??
    "Não foi possível gerar uma resposta agora. Tente novamente em instantes.";
  const tokensUsed = completion.usage?.total_tokens;
  const costInCents = estimateCostInCents(tokensUsed);

  await prisma.aiCache.create({
    data: {
      cacheKey,
      questionHash,
      answer,
      mode: input.mode,
      excelVersion: input.excelVersion,
    },
  });

  return {
    answer,
    source: "openai",
    model: OPENAI_MODEL,
    openAiCalled: true,
    tokensUsed,
    costInCents,
  };
}

