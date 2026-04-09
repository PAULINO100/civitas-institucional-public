import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, locales, defaultLocale, type Locale } from "@/i18n/getDictionary";
import DesktopSidebar from "@/components/DesktopSidebar";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale;
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background flex flex-col lg:flex-row overflow-x-hidden text-zinc-100">
        <AuthProvider>
          {/* Desktop Sidebar */}
          <DesktopSidebar dict={dict} currentLang={lang} />

          {/* Main Content Area */}
          <div className="flex-1 lg:pl-64 transition-all duration-500">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
