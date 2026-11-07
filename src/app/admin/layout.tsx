import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin CMS | Sangales Group",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-stone-100 text-charcoal">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Admin Top Utility Bar */}
        <header className="h-16 bg-white border-b border-stone-200 px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-navy">
              Corporate Administration Console
            </span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-sm">
              Live Environment
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500">Authorized:</span>
            <span className="font-bold text-navy">admin@sangales.com (Super Admin)</span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
