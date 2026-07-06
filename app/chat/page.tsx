import { ConversationMode, ExcelVersion, MessageRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { submitChatQuestion } from "@/app/chat/actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const modes = [
  { value: ConversationMode.FORMULA, label: "Fórmula" },
  { value: ConversationMode.EXPLAIN, label: "Explicar" },
  { value: ConversationMode.FIX, label: "Corrigir" },
  { value: ConversationMode.CONVERT, label: "Converter" },
  { value: ConversationMode.VBA, label: "VBA" },
  { value: ConversationMode.POWER_QUERY, label: "Power Query" },
  { value: ConversationMode.OFFICE_SCRIPT, label: "Office Script" },
];

const excelVersions = [
  { value: ExcelVersion.EXCEL_2013, label: "Excel 2013" },
  { value: ExcelVersion.EXCEL_2016, label: "Excel 2016" },
  { value: ExcelVersion.EXCEL_2019, label: "Excel 2019" },
  { value: ExcelVersion.EXCEL_2021, label: "Excel 2021" },
  { value: ExcelVersion.EXCEL_365, label: "Excel 365" },
  { value: ExcelVersion.GOOGLE_SHEETS, label: "Google Sheets" },
];

const roleLabels: Record<MessageRole, string> = {
  USER: "Você",
  ASSISTANT: "ExcelGPT Brasil",
  SYSTEM: "Sistema",
};

type ChatPageProps = {
  searchParams: Promise<{
    conversationId?: string;
    error?: string;
  }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;
  const conversation = params.conversationId
    ? await prisma.conversation.findFirst({
        where: {
          id: params.conversationId,
          userId: session.user.id,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })
    : null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[380px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            ExcelGPT Brasil
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">Chat</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Envie uma pergunta para receber uma resposta especializada em Excel.
          </p>

          {params.error === "limit" ? (
            <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              Você atingiu o limite diário do plano grátis.
            </div>
          ) : null}

          {params.error === "invalid" ? (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900">
              Preencha a pergunta, o modo e a versão do Excel corretamente.
            </div>
          ) : null}

          {params.error === "openai_config" ? (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900">
              A chave da OpenAI ainda não foi configurada. Defina OPENAI_API_KEY para ativar as
              respostas com IA.
            </div>
          ) : null}

          <form action={submitChatQuestion} className="mt-8 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Pergunta</span>
              <textarea
                name="question"
                required
                rows={6}
                maxLength={4000}
                className="resize-none rounded-md border border-slate-300 px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                placeholder="Ex: Preciso somar vendas por mês usando uma coluna de datas."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Modo</span>
              <select
                name="mode"
                defaultValue={ConversationMode.FORMULA}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              >
                {modes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Versão do Excel</span>
              <select
                name="excelVersion"
                defaultValue={ExcelVersion.EXCEL_365}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              >
                {excelVersions.map((version) => (
                  <option key={version.value} value={version.value}>
                    {version.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Enviar pergunta
            </button>
          </form>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {conversation ? (
            <>
              <div className="border-b border-slate-200 pb-5">
                <p className="text-sm font-medium text-slate-500">
                  {conversation.mode} · {conversation.excelVersion}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
                  {conversation.title}
                </h2>
              </div>

              <div className="mt-6 grid gap-4">
                {conversation.messages.map((message) => (
                  <article
                    key={message.id}
                    className="rounded-md border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold text-brand-700">{roleLabels[message.role]}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                      {message.content}
                    </p>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="flex min-h-[420px] items-center justify-center text-center">
              <div>
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                  Nenhuma conversa selecionada
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Envie a primeira pergunta para salvar uma conversa com resposta da IA.
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
