"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/getDictionary";

const labels: Record<Locale, string> = { pt: "PT", en: "EN", es: "ES" };

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();

  function getLangPath(lang: Locale) {
    // Replace the current lang segment with the new one
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = lang;
    } else {
      segments.splice(1, 0, lang);
    }
    return segments.join("/") || `/${lang}`;
  }

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1">
      {locales.map((lang, idx) => (
        <React.Fragment key={lang}>
          <Link
            href={getLangPath(lang)}
            className={`text-xs font-mono px-2 py-0.5 rounded-full transition-all ${
              currentLang === lang
                ? "bg-primary text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {labels[lang]}
          </Link>
          {idx < locales.length - 1 && (
            <span className="text-zinc-700 text-xs">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
