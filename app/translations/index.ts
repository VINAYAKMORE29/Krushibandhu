import en from "./en";
import hi from "./hi";
import mr from "./mr";

export const translations = {
  en,
  hi,
  mr,
} as const;

export type Language = keyof typeof translations;

export type Translation = typeof en;

export function getTranslations(language: Language): Translation {
  return translations[language] as Translation;
}