"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Locale } from "@/lib/translations";

interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  badge: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", badge: "Default" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", badge: "महाराष्ट्र" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी", badge: "भारत" },
];

interface Props {
  variant?: "dropdown" | "segmented" | "compact";
  isDarkTheme?: boolean;
  className?: string;
}

export default function LanguageSwitcher({
  variant = "dropdown",
  isDarkTheme = false,
  className = "",
}: Props) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  // 1. Segmented Control Variant (Ideal for Mobile Drawer, Mobile Quick Bar & Footer)
  if (variant === "segmented") {
    return (
      <div
        className={`inline-flex items-center rounded-sm p-1 border ${
          isDarkTheme
            ? "bg-navy-950/80 border-navy-700/80"
            : "bg-stone-100 border-stone-200"
        } ${className}`}
        role="group"
        aria-label="Language selection"
      >
        {LANGUAGES.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLocale(lang.code)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all cursor-pointer flex items-center gap-1 ${
                isActive
                  ? isDarkTheme
                    ? "bg-gold text-navy shadow-sm"
                    : "bg-white text-navy shadow-sm border border-stone-200/60"
                  : isDarkTheme
                  ? "text-stone-300 hover:text-white"
                  : "text-stone-600 hover:text-navy"
              }`}
            >
              <span>{lang.nativeLabel}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-navy inline-block" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Compact Pill Variant (e.g. In Landing Header or Quick Bars)
  if (variant === "compact") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-sm border transition-colors cursor-pointer ${
            isDarkTheme
              ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
              : "bg-white hover:bg-stone-50 text-navy border-stone-200 shadow-2xs"
          }`}
          aria-expanded={isOpen}
          aria-label="Select website language"
        >
          <Globe className="w-3.5 h-3.5 text-gold-700" />
          <span>{currentLang.nativeLabel}</span>
          <ChevronDown className="w-3 h-3 text-stone-400" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-sm shadow-xl border border-stone-200 py-1 z-50 animate-in fade-in-50 zoom-in-95">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                  locale === lang.code
                    ? "font-bold text-navy bg-gold/10"
                    : "text-charcoal font-medium"
                }`}
              >
                <span>{lang.nativeLabel}</span>
                {locale === lang.code && <Check className="w-3.5 h-3.5 text-gold-700" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 3. Dropdown Variant (Standard Header Navigation)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all duration-200 cursor-pointer ${
          isDarkTheme
            ? "bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-gold/60"
            : "bg-white hover:bg-stone-50 text-navy border-stone-300 hover:border-gold/60 shadow-2xs"
        }`}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-gold-700 shrink-0" />
        <span className="tracking-wide">{currentLang.nativeLabel}</span>
        <ChevronDown
          className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-2xl border border-stone-200/90 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3 py-1 border-b border-stone-100 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Language / भाषा / भाषा
            </span>
          </div>

          {LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-gold/15 text-navy font-bold"
                    : "text-charcoal hover:bg-stone-50 font-medium"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-heading">{lang.nativeLabel}</span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    {lang.label} &bull; {lang.badge}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

