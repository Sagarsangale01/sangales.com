import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-offwhite px-4">
      <div className="flex flex-col items-center space-y-4">
        {/* Typographic Monogram */}
        <div className="w-12 h-12 rounded-sm bg-navy flex items-center justify-center text-gold font-heading font-black text-xl shadow-md animate-pulse">
          S
        </div>
        <div className="space-y-1 text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-navy uppercase">
            SANGALES
          </p>
          <p className="text-[10px] font-semibold tracking-superwide text-gold-700 uppercase">
            A Group of Companies
          </p>
        </div>
        {/* Subtle loading bar */}
        <div className="w-32 h-0.5 bg-stone-200 overflow-hidden rounded-full">
          <div className="w-full h-full bg-gold animate-indeterminate" />
        </div>
      </div>
    </div>
  );
}

