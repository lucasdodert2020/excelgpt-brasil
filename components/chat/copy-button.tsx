"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel?: string;
  className?: string;
};

export function CopyButton({
  value,
  label,
  copiedLabel = "Copiado",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ??
        "min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      }
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
