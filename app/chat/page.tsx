import { redirect } from "next/navigation";
import { ChatForm } from "@/components/chat/chat-form";
import { ChatMessage } from "@/components/chat/chat-message";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8">
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

          <ChatForm />
        </aside>

        <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {conversation ? (
            <>
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {conversation.mode}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {conversation.excelVersion}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
                  {conversation.title}
                </h2>
              </div>

              <div className="mt-6 grid gap-4">
                {conversation.messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    metadata={message.metadata}
                  />
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
