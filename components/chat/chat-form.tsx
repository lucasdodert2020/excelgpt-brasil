import { ConversationMode, ExcelVersion } from "@prisma/client";
import { submitChatQuestion } from "@/app/chat/actions";

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

export function ChatForm() {
  return (
    <form action={submitChatQuestion} className="mt-8 grid gap-5">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-800">Pergunta</span>
        <textarea
          name="question"
          required
          rows={6}
          maxLength={4000}
          className="min-h-36 resize-y rounded-md border border-slate-300 px-3 py-2 text-base leading-6 text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:text-sm"
          placeholder="Ex: Preciso somar vendas por mês usando uma coluna de datas."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-800">Modo</span>
          <select
            name="mode"
            defaultValue={ConversationMode.FORMULA}
            className="min-h-11 rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:text-sm"
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
            className="min-h-11 rounded-md border border-slate-300 px-3 py-2 text-base text-slate-950 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:text-sm"
          >
            {excelVersions.map((version) => (
              <option key={version.value} value={version.value}>
                {version.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="min-h-11 rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Enviar pergunta
      </button>
    </form>
  );
}

