import { createContext } from "react";

export interface LanguageContextValue {
  currentLanguage: string;
  availableLanguages: Array<{ code: string; name: string; abbreviation: string }>;
  setLanguage: (language: string) => void;
  getTranslation: <T extends { languages_code?: string | null }>(
    translations: T[] | undefined,
    fallback?: T
  ) => T | undefined;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);