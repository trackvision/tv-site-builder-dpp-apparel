import React, { useState, useMemo, useCallback } from "react";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext";
import { LANGUAGE_CONSTANTS } from "@/constants";

interface LanguageProviderProps {
  children: React.ReactNode;
}

function detectBrowserLanguage(): string {
  const browserLanguages = navigator.languages || [navigator.language];
  const availableCodes = LANGUAGE_CONSTANTS.AVAILABLE_LANGUAGES.map(lang => lang.code) as string[];
  
  // Try to find exact match
  const exactMatch = browserLanguages.find(lang => availableCodes.includes(lang));
  if (exactMatch) return exactMatch;
  
  // Try to find language family match (e.g., "es" for "es-MX")
  const familyMatch = browserLanguages
    .map(lang => lang.split('-')[0])
    .find(langFamily => 
      availableCodes.some(code => code.split('-')[0] === langFamily)
    );
  
  if (familyMatch) {
    const matchedCode = availableCodes.find(code => code.split('-')[0] === familyMatch);
    if (matchedCode) return matchedCode;
  }
  
  return LANGUAGE_CONSTANTS.DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(LANGUAGE_CONSTANTS.STORAGE_KEY);
    if (stored && LANGUAGE_CONSTANTS.AVAILABLE_LANGUAGES.some(lang => lang.code === stored)) {
      return stored;
    }
    
    // Fall back to browser detection
    return detectBrowserLanguage();
  });

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem(LANGUAGE_CONSTANTS.STORAGE_KEY, language);
  };

  const getTranslation = useCallback(<T extends { languages_code?: string | null }>(
    translations: T[] | undefined,
    fallback?: T
  ): T | undefined => {
    if (!translations || translations.length === 0) return fallback;
    
    // Try current language
    let translation = translations.find(t => t.languages_code === currentLanguage);
    
    // Try fallback language
    if (!translation) {
      translation = translations.find(t => t.languages_code === LANGUAGE_CONSTANTS.FALLBACK_LANGUAGE);
    }
    
    // Return first available or provided fallback
    return translation || translations[0] || fallback;
  }, [currentLanguage]);

  const contextValue: LanguageContextValue = useMemo(() => ({
    currentLanguage,
    availableLanguages: [...LANGUAGE_CONSTANTS.AVAILABLE_LANGUAGES],
    setLanguage,
    getTranslation
  }), [currentLanguage, getTranslation]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}