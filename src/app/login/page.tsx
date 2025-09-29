"use client";
import { AuthHeader } from "../../components/AuthHeader";
import { ThemeProvider } from "../../components/ThemeProvider"; // still wraps but toggle removed
import Link from "next/link";

export default function LoginPage() {
  return (
    <ThemeProvider>
      <AuthHeader />
      <main className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-gradient-to-b from-[var(--color-primary-soft)] via-white to-[var(--color-accent-soft)] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-8 shadow-lg space-y-6">
          <header className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Masuk</h1>
            <p className="text-sm text-[var(--color-muted)]">Selamat datang kembali. Lanjutkan perjalanan imanmu.</p>
          </header>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const data = Object.fromEntries(new FormData(form).entries());
              alert(`(Demo) Auth submit: ${JSON.stringify(data, null, 2)}`);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">Email</label>
              <input name="email" type="email" required className="w-full rounded-lg border border-[var(--color-border)] dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="kamu@contoh.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">Kata Sandi</label>
              <input name="password" type="password" required className="w-full rounded-lg border border-[var(--color-border)] dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] hover:brightness-110 text-white font-semibold text-sm py-2.5 shadow-sm shadow-blue-500/30 transition">Masuk</button>
          </form>
          <p className="text-[11px] text-center text-[var(--color-muted)]">Belum punya akun? <Link href="/" className="text-[var(--color-primary)] hover:underline">Daftar Beta</Link></p>
        </div>
      </main>
    </ThemeProvider>
  );
}
