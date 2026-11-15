"use client";

import React from "react";
import { buildAttributedWhatsAppUrl } from "@/lib/utm";
import { trackWhatsAppClick } from "@/lib/analytics";

interface Props {
  phone?: string;
  message: string;
  businessName?: string;
  businessSlug?: string;
  productName?: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}

export default function AttributedWhatsAppButton({
  phone = "917507700936",
  message,
  businessName,
  businessSlug,
  productName,
  source,
  className = "",
  children,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackWhatsAppClick({
      businessName,
      businessSlug,
      productName,
      source,
      phoneNumber: phone,
    });

    // Re-generate URL at click time so dynamic UTMs captured on current page are fresh
    const dynamicUrl = buildAttributedWhatsAppUrl(phone, message, businessSlug || businessName);
    e.currentTarget.href = dynamicUrl;
  };

  const initialUrl = buildAttributedWhatsAppUrl(phone, message, businessSlug || businessName);

  return (
    <a
      href={initialUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

