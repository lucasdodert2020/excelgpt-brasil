import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          ExcelGPT Brasil
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">Entrar</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Acesse sua conta para continuar no SaaS especialista em Excel.
        </p>

        <form
          className="mt-8"
          action={async () => {
            "use server";

            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            Entrar com Google
          </button>
        </form>
      </section>
    </main>
  );
}

