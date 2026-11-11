"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareBusinessButtonProps {
  businessName: string;
}

export default function ShareBusinessButton({ businessName }: ShareBusinessButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${businessName} | SANGALES GROUP`;
    const text = `Explore ${businessName} — a business division of SANGALES GROUP:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err) {
        // User cancelled or share not supported, fall back to copy
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        console.error("Clipboard copy failed", e);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-navy font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-stone-200"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700">Link Copied to Clipboard</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-gold-700" />
          <span>Share Business Profile</span>
        </>
      )}
    </button>
  );
}

