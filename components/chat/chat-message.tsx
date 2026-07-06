"use client";

import type { MessageRole, Prisma } from "@prisma/client";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyButton } from "@/components/chat/copy-button";

type MessageMetadata = {
  source?: "openai" | "cache" | "chat_form" | string;
};

type ChatMessageProps = {
  role: MessageRole;
  content: string;
  metadata: Prisma.JsonValue | null;
};

const roleLabels: Record<MessageRole, string> = {
  USER: "Você",
  ASSISTANT: "ExcelGPT Brasil",
  SYSTEM: "Sistema",
};

function getMetadata(value: Prisma.JsonValue): MessageMetadata {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as MessageMetadata;
  }

  return {};
}

function getSourceLabel(source?: string) {
  if (source === "openai") {
    return "IA";
  }

  if (source === "cache") {
    return "Cache";
  }

  return null;
}

function getCodeText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getCodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getCodeText(children.props.children);
  }

  return String(children ?? "");
}

export function ChatMessage({ role, content, metadata }: ChatMessageProps) {
  const parsedMetadata = getMetadata(metadata);
  const sourceLabel = role === "ASSISTANT" ? getSourceLabel(parsedMetadata.source) : null;
  const isAssistant = role === "ASSISTANT";

  return (
    <article className="rounded-md border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-brand-700">{roleLabels[role]}</p>
          {sourceLabel ? (
            <span className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
              {sourceLabel}
            </span>
          ) : null}
        </div>

        {isAssistant ? <CopyButton value={content} label="Copiar resposta" /> : null}
      </div>

      <div className="mt-4 max-w-none text-sm leading-7 text-slate-800">
        {isAssistant ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p({ children }) {
                return <p className="mb-4 last:mb-0">{children}</p>;
              },
              ul({ children }) {
                return <ul className="mb-4 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="mb-4 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>;
              },
              li({ children }) {
                return <li className="pl-1">{children}</li>;
              },
              strong({ children }) {
                return <strong className="font-semibold text-slate-950">{children}</strong>;
              },
              code({ className, children }) {
                const codeText = getCodeText(children);

                return (
                  <code
                    className={
                      className
                        ? `${className} font-mono`
                        : "rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-950"
                    }
                  >
                    {codeText}
                  </code>
                );
              },
              pre({ children }) {
                const codeText = getCodeText(children).trim();

                return (
                  <div className="my-4 overflow-hidden rounded-md border border-slate-800 bg-slate-950">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-3 py-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Código
                      </span>
                      <CopyButton
                        value={codeText}
                        label="Copiar fórmula/código"
                        copiedLabel="Código copiado"
                        className="min-h-9 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                      />
                    </div>
                    <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-50">
                      {children}
                    </pre>
                  </div>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </article>
  );
}
