import dynamic from "next/dynamic";
import { WaitlistHero } from "@/components/waitlist/Hero"; // already client component internally
import SiteHeader from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

// Dynamic imports (code-splitting) for below-the-fold / heavier interactive sections
const LaunchCountdown = dynamic(()=> import("@/components/waitlist/LaunchCountdown").then(m=>m.LaunchCountdown), {
  loading: () => <div className="py-10 text-center text-xs text-slate-500 animate-pulse">Menyiapkan countdown…</div>
});
const FeatureTeasers = dynamic(()=> import("@/components/waitlist/FeatureTeasers").then(m=>m.FeatureTeasers), {
  loading: () => <div className="py-16 text-center text-xs text-slate-500 animate-pulse">Memuat fitur…</div>
});
const WaitlistForm = dynamic(()=> import("@/components/waitlist/WaitlistForm").then(m=>m.WaitlistForm), {
  loading: () => <div className="py-24 text-center text-xs text-slate-500 animate-pulse">Memuat formulir…</div>
});

// SEO Metadata (App Router)
export const metadata = {
  title: "Daftar Awal • Veritas",
  description: "Masuk daftar tunggu Veritas dan dapatkan akses eksklusif lebih awal.",
  openGraph: {
  title: "Daftar Awal • Veritas",
  description: "Masuk daftar tunggu Veritas dan dapatkan akses eksklusif lebih awal.",
    type: "website"
  }
};

// Optional: encourage static optimization (countdown is client-only anyway)
export const revalidate = 3600; // regenerate every hour if needed

export default function DaftarAwalPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <SiteHeader />
      {/* Decorative gradients (static) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/50 to-white dark:via-slate-800/40 dark:to-slate-950" />
      </div>
      <WaitlistHero titleVariant={3} />
      {/* Lazy / dynamic sections */}
      <LaunchCountdown />
      <FeatureTeasers />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
