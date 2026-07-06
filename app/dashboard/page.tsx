import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const name = session.user.name ?? "Usuario";
  const email = session.user.email ?? "Email nao informado";
  const plan = session.user.plan ?? "FREE";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <section className="mx-auto w-full max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          ExcelGPT Brasil
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">Dashboard</h1>

        <div className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">Nome</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Plano atual</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{plan}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

