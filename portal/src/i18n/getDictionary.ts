import type { Dictionary } from "./dictionaries/pt";

const dictionaries = {
  pt: () => import("./dictionaries/pt").then((m) => m.pt),
  en: () => import("./dictionaries/en").then((m) => m.en),
  es: () => import("./dictionaries/es").then((m) => m.es),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["pt", "en", "es"];
export const defaultLocale: Locale = "pt";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]?.() ?? dictionaries[defaultLocale]();
}
