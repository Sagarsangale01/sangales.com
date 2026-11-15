"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Locale, TranslationDictionary, translations, getTranslation } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  dict: TranslationDictionary;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (path: string) => path,
  dict: translations.en,
  isReady: false,
});

const VALID_LOCALES: Locale[] = ["en", "mr", "hi"];

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      // 1. Check URL query params (e.g. ?lang=mr)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang") as Locale | null;

      if (urlLang && VALID_LOCALES.includes(urlLang)) {
        setLocaleState(urlLang);
        localStorage.setItem("sangales_locale", urlLang);
        document.cookie = `NEXT_LOCALE=${urlLang}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = urlLang;
        setIsReady(true);
        return;
      }

      // 2. Check localStorage
      const savedLang = localStorage.getItem("sangales_locale") as Locale | null;
      if (savedLang && VALID_LOCALES.includes(savedLang)) {
        setLocaleState(savedLang);
        document.documentElement.lang = savedLang;
        setIsReady(true);
        return;
      }

      // 3. Check Cookie
      const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
      if (match && match[1] && VALID_LOCALES.includes(match[1] as Locale)) {
        const cookieLang = match[1] as Locale;
        setLocaleState(cookieLang);
        document.documentElement.lang = cookieLang;
        setIsReady(true);
        return;
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    setIsReady(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!VALID_LOCALES.includes(newLocale)) return;

    setLocaleState(newLocale);

    try {
      localStorage.setItem("sangales_locale", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLocale;
      }
    } catch {
      // Fallback
    }
  }, []);

  const t = useCallback(
    (path: string): string => {
      return getTranslation(locale, path);
    },
    [locale]
  );

  const dict = translations[locale] || translations.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dict, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
