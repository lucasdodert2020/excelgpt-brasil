"use server";

import { ConversationMode, ExcelVersion, MessageRole, UserPlan } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateExcelAnswer, MissingOpenAiKeyError } from "@/services/ai/excel-assistant";

const DAILY_FREE_LIMIT = 10;
const CHAT_USAGE_ACTION = "CHAT_QUESTION_SUBMITTED";
const CHAT_LIMIT_ACTION = "CHAT_DAILY_LIMIT_EXCEEDED";
const CHAT_OPENAI_CONFIG_ERROR_ACTION = "CHAT_OPENAI_CONFIG_ERROR";

const chatSchema = z.object({
  question: z.string().trim().min(1).max(4000),
  mode: z.nativeEnum(ConversationMode),
  excelVersion: z.nativeEnum(ExcelVersion),
});

function getTodayStart() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function buildTitle(question: string) {
  return question.length > 80 ? `${question.slice(0, 77)}...` : question;
}

export async function submitChatQuestion(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const parsed = chatSchema.safeParse({
    question: formData.get("question"),
    mode: formData.get("mode"),
    excelVersion: formData.get("excelVersion"),
  });

  if (!parsed.success) {
    redirect("/chat?error=invalid");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, plan: true },
  });

  if (!user) {
    redirect("/login");
  }

  const todayStart = getTodayStart();

  if (user.plan === UserPlan.FREE) {
    const dailyUsage = await prisma.usageLog.count({
      where: {
        userId: user.id,
        action: CHAT_USAGE_ACTION,
        createdAt: {
          gte: todayStart,
        },
      },
    });

    if (dailyUsage >= DAILY_FREE_LIMIT) {
      await prisma.usageLog.create({
        data: {
          userId: user.id,
          action: CHAT_LIMIT_ACTION,
        },
      });

      redirect("/chat?error=limit");
    }
  }

  const { question, mode, excelVersion } = parsed.data;
  let aiAnswer;

  try {
    aiAnswer = await generateExcelAnswer({
      question,
      mode,
      excelVersion,
    });
  } catch (error) {
    if (error instanceof MissingOpenAiKeyError) {
      await prisma.usageLog.create({
        data: {
          userId: user.id,
          action: CHAT_OPENAI_CONFIG_ERROR_ACTION,
          tokensUsed: 0,
          costInCents: 0,
        },
      });

      redirect("/chat?error=openai_config");
    }

    throw error;
  }

  const conversation = await prisma.conversation.create({
    data: {
      userId: user.id,
      title: buildTitle(question),
      mode,
      excelVersion,
      messages: {
        create: [
          {
            role: MessageRole.USER,
            content: question,
            metadata: {
              source: "chat_form",
            },
          },
          {
            role: MessageRole.ASSISTANT,
            content: aiAnswer.answer,
            metadata: {
              source: aiAnswer.source,
              model: aiAnswer.model,
              openAiCalled: aiAnswer.openAiCalled,
            },
          },
        ],
      },
    },
  });

  await prisma.usageLog.create({
    data: {
      userId: user.id,
      action: CHAT_USAGE_ACTION,
      tokensUsed: aiAnswer.tokensUsed ?? 0,
      costInCents: aiAnswer.costInCents ?? 0,
    },
  });

  redirect(`/chat?conversationId=${conversation.id}`);
}
