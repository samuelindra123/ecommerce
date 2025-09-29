import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
  default: "Veritas – Sosial Media Kristen Modern",
  template: "%s | Veritas",
  },
  description:
    "Platform komunitas Kristen modern: renungan harian, doa terpadu, kelompok rohani, dan aksi misi. Menguatkan iman & menyatukan hati.",
  keywords: [
    "sosial media kristen",
    "komunitas kristen",
    "renungan harian",
    "doa online",
    "pelayanan digital",
  ],
  authors: [{ name: "Veritas" }],
  creator: "Veritas",
  openGraph: {
  title: "Veritas – Sosial Media Kristen Modern",
    description:
      "Renungan, doa, komunitas & misi dalam satu platform. Bergabung dan bertumbuh bersama.",
    type: "website",
    locale: "id_ID",
  url: "https://veritas.example.com",
  siteName: "Veritas",
  },
  twitter: {
    card: "summary_large_image",
  title: "Veritas – Sosial Media Kristen Modern",
    description:
      "Renungan, doa, komunitas & misi dalam satu platform. Bergabung dan bertumbuh bersama.",
  },
  metadataBase: new URL("https://veritas.example.com"),
  category: "religion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Prefetch system dark mode class to avoid FOUC if persisted later */}
        {/* Removed dark mode persistence script */}
        <div className="flex min-h-screen flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
