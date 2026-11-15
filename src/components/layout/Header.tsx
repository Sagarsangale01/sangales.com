"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown, Building2, Eye, Compass, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface Props {
  settings?: {
    siteName?: string;
    descriptor?: string;
  };
}

export default function Header({ settings }: Props) {
  const { dict, locale } = useLanguage();
  const siteName = settings?.siteName || "SANGALES";
  const descriptor = settings?.descriptor || "A Group of Companies";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAboutDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 220); // 220ms grace period ensures mouse transition across submenus never drops
  };

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [pathname]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDarkHero = pathname === "/" && !isScrolled;

  // Sub-items for About Us Dropdown
  const aboutSubItems = [
    {
      title: dict.nav.about,
      desc:
        locale === "mr"
          ? "सांगळे समूहाचा इतिहास व पार्श्वभूमी"
          : locale === "hi"
          ? "सांगळे समूह का परिचय एवं पृष्ठभूमि"
          : "Overview of SANGALES Group & Governance",
      href: "/about",
      icon: Building2,
    },
    {
      title: dict.nav.vision,
      desc:
        locale === "mr"
          ? "आमची मूल्ये आणि भविष्यवेध"
          : locale === "hi"
          ? "हमारे मूल्य और भविष्यदृष्टि"
          : "Mission, core values & ethical commitments",
      href: "/our-vision",
      icon: Eye,
    },
    {
      title: dict.nav.journey,
      desc:
        locale === "mr"
          ? "उद्योगाचा यशस्वी प्रवास व टप्पे"
          : locale === "hi"
          ? "हमारी विकास यात्रा और मील के पत्थर"
          : "Foundational journey & milestones",
      href: "/our-journey",
      icon: Compass,
    },
    {
      title: dict.nav.news,
      desc:
        locale === "mr"
          ? "समूहातील घडामोडी आणि प्रेस बातम्या"
          : locale === "hi"
          ? "समूह की ताजा खबरें और अपडेट्स"
          : "Corporate announcements & media releases",
      href: "/news",
      icon: Newspaper,
    },
  ];

  const isAboutActive = ["/about", "/our-vision", "/our-journey", "/news"].some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Core desktop nav links
  const primaryNavLinks = [
    { label: dict.nav.businesses, href: "/businesses" },
    { label: dict.nav.catalogue, href: "/catalogue" },
    { label: dict.nav.careers, href: "/careers" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  // Full links list for mobile drawer
  const allMobileNavLinks = [
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.businesses, href: "/businesses" },
    { label: dict.nav.catalogue, href: "/catalogue" },
    { label: dict.nav.vision, href: "/our-vision" },
    { label: dict.nav.journey, href: "/our-journey" },
    { label: dict.nav.news, href: "/news" },
    { label: dict.nav.careers, href: "/careers" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/60 py-3"
          : isDarkHero
          ? "bg-transparent py-4 sm:py-5"
          : "bg-white/90 backdrop-blur-md border-b border-stone-200/40 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 xl:gap-10">
          {/* Brand Logo - Fixed size with shrink-0 and generous right margin so it NEVER gets encroached */}
          <Link
            href="/"
            className="shrink-0 flex items-center focus:outline-none py-1 mr-3 lg:mr-6 xl:mr-10"
          >
            <img
              src={isDarkHero ? "/logos/sangales-logo-white.png" : "/logos/sangales-logo.png"}
              alt={`${siteName} – ${descriptor}`}
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation - Centered / Distributed with ample spacing */}
          <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-9">
            {/* About Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setAboutDropdownOpen((prev) => !prev);
                }}
                className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center gap-1.5 py-1 px-1 cursor-pointer ${
                  isAboutActive
                    ? isDarkHero
                      ? "text-gold"
                      : "text-navy"
                    : isDarkHero
                    ? "text-stone-200 hover:text-white"
                    : "text-charcoal-100 hover:text-navy"
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>{dict.nav.about}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutDropdownOpen ? "rotate-180 text-gold" : "text-stone-400"
                  }`}
                />
                {isAboutActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />
                )}
              </button>

              {/* Mega Dropdown Menu with zero-gap hover bridge */}
              {aboutDropdownOpen && (
                <div
                  className="absolute left-0 top-full pt-2 w-80 z-[100]"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="bg-white rounded-sm shadow-2xl border border-stone-200/90 border-t-2 border-t-gold p-2.5 animate-in fade-in-50 zoom-in-95">
                    <div className="space-y-1">
                      {aboutSubItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              if (timeoutRef.current) clearTimeout(timeoutRef.current);
                              setAboutDropdownOpen(false);
                            }}
                            className={`flex items-start gap-3 p-2.5 rounded-sm transition-colors ${
                              isActive
                                ? "bg-gold/15 text-navy font-bold"
                                : "hover:bg-stone-50 text-charcoal hover:text-navy"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-sm bg-navy text-gold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-navy block leading-tight">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 leading-normal">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Primary Links */}
            {primaryNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1 px-1 ${
                    isActive
                      ? isDarkHero
                        ? "text-gold font-bold"
                        : "text-navy font-bold"
                      : isDarkHero
                      ? "text-stone-200 hover:text-white"
                      : "text-charcoal-100 hover:text-navy"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Language Switcher + Partner Button */}
          {/* Note: explicit left border and generous padding creates an uncrossable buffer zone */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0 ml-auto pl-6 xl:pl-8 border-l border-stone-300">
            <LanguageSwitcher variant="dropdown" isDarkTheme={isDarkHero} />

            <Link
              href="/contact?type=Partnership"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-sm transition-all duration-300 shadow-sm whitespace-nowrap ${
                isDarkHero
                  ? "bg-gold text-navy hover:bg-white hover:text-navy"
                  : "bg-navy text-white hover:bg-gold hover:text-navy"
              }`}
            >
              <span>{dict.nav.partnerWithUs}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile View: Language Switcher + Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher variant="compact" isDarkTheme={isDarkHero} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDarkHero
                  ? "text-white hover:bg-white/10"
                  : "text-navy hover:bg-stone-100"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-navy-800 text-white px-6 py-6 space-y-5 shadow-xl">
          <div className="pb-3 border-b border-navy-800/80 flex items-center justify-between">
            <img
              src="/logos/sangales-logo-white.png"
              alt="SANGALES – A GROUP OF COMPANIES"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Mobile Language Switcher */}
          <div className="pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
              Language / भाषा निवडा:
            </span>
            <LanguageSwitcher
              variant="segmented"
              isDarkTheme={true}
              className="w-full justify-between"
            />
          </div>

          {/* Full Vertical Navigation List */}
          <nav className="flex flex-col space-y-1.5 border-t border-navy-800 pt-3">
            {allMobileNavLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base py-2 border-b border-navy-800/60 transition-colors flex items-center justify-between ${
                    isActive ? "text-gold font-bold" : "text-stone-300 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/contact?type=Partnership"
              className="w-full text-center py-3 bg-gold text-navy font-bold text-xs tracking-wider uppercase rounded-sm hover:bg-white transition-colors"
            >
              {dict.nav.partnerWithUs}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
