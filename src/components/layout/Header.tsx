"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "Our Vision", href: "/our-vision" },
  { label: "Our Journey", href: "/our-journey" },
  { label: "News & Updates", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

interface Props {
  settings?: {
    siteName?: string;
    descriptor?: string;
  };
}

export default function Header({ settings }: Props) {
  const siteName = settings?.siteName || "SANGALE'S";
  const descriptor = settings?.descriptor || "A Group of Companies";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDarkHero = pathname === "/" && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/60 py-3.5"
          : isDarkHero
          ? "bg-transparent py-5"
          : "bg-white/90 backdrop-blur-md border-b border-stone-200/40 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center focus:outline-none py-1">
            <img
              src={isDarkHero ? "/logos/sangales-logo-white.png" : "/logos/sangales-logo.png"}
              alt={`${siteName} – ${descriptor}`}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? isDarkHero
                        ? "text-gold font-semibold"
                        : "text-navy font-semibold"
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

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact?type=Partnership"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 ${
                isDarkHero
                  ? "bg-gold text-navy hover:bg-white hover:text-navy shadow-sm"
                  : "bg-navy text-white hover:bg-gold hover:text-navy shadow-sm"
              }`}
            >
              Partner With Us
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDarkHero ? "text-white hover:bg-white/10" : "text-navy hover:bg-stone-100"
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
        <div className="lg:hidden bg-navy-900 border-b border-navy-800 text-white px-6 py-6 space-y-4 shadow-xl">
          <div className="pb-3 border-b border-navy-800/80">
            <img
              src="/logos/sangales-logo-white.png"
              alt="SANGALE'S – A GROUP OF COMPANIES"
              className="h-9 w-auto object-contain"
            />
          </div>
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base py-2 border-b border-navy-800 transition-colors ${
                    isActive ? "text-gold font-semibold" : "text-stone-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/contact?type=Partnership"
              className="w-full text-center py-3 bg-gold text-navy font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-white transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

