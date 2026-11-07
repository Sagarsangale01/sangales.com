"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, AlertCircle, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sangales.com");
  const [password, setPassword] = useState("SangalesAdmin2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950 p-4">
      <div className="max-w-md w-full bg-white rounded-sm border border-stone-200 shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="bg-navy p-8 text-center text-white border-b border-navy-800 space-y-2">
          <span className="font-heading text-2xl font-black tracking-widest text-white block">
            SANGALES
          </span>
          <span className="text-[10px] font-bold tracking-superwide text-gold uppercase block">
            A Group of Companies &bull; CMS Authentication
          </span>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-bold text-navy">
              Executive Sign In
            </h2>
            <p className="text-xs text-charcoal-100">
              Enter your authorized administrative credentials to access group management.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold text-charcoal"
                />
              </div>
            </div>

            <div className="p-3 bg-stone-50 border border-stone-200 text-[11px] text-charcoal-100 rounded-sm space-y-0.5">
              <p className="font-bold text-navy">Default Initial Credentials:</p>
              <p>Email: <span className="font-mono text-navy font-semibold">admin@sangales.com</span></p>
              <p>Password: <span className="font-mono text-navy font-semibold">SangalesAdmin2026!</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-stone-100">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-navy transition-colors"
            >
              &larr; Return to Public Corporate Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
