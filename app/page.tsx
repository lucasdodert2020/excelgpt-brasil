export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-700">
          SaaS brasileiro para planilhas
        </p>
        <h1 className="text-4xl font-bold tracking-normal text-slate-950 sm:text-6xl">
          ExcelGPT Brasil
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700 sm:text-xl">
          Sua IA especialista em Excel
        </p>
        <button className="mt-10 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
          Começar agora
        </button>
      </section>
    </main>
  );
}

