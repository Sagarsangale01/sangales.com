import React from "react";
import Link from "next/link";
import {
  Building2,
  Inbox,
  Newspaper,
  Briefcase,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { getDashboardStats } from "@/services/dashboardService";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-sm border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-gold-700 text-xs font-bold tracking-superwide uppercase block mb-1">
            Sangale's Group Executive Console
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy">
            Corporate Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-100 mt-1">
            Real-time telemetry and database management across all operating entities and public enquiry pipelines.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/businesses?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Business</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-offwhite hover:bg-stone-200 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-300"
          >
            <Inbox className="w-4 h-4" />
            <span>Review Leads</span>
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid (All actual database counts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Businesses */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
              Total Businesses
            </span>
            <div className="w-8 h-8 rounded-sm bg-navy-50 flex items-center justify-center text-navy">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-navy">
              {stats.totalBusinesses}
            </span>
            <span className="text-xs text-stone-400 font-medium">Entities</span>
          </div>
          <div className="text-xs text-stone-500 border-t border-stone-100 pt-2 flex items-center justify-between">
            <span className="text-emerald-700 font-semibold">{stats.publishedBusinesses} Active</span>
            <span className="text-amber-700 font-semibold">{stats.draftBusinesses} Drafts</span>
            <span className="text-blue-700 font-semibold">{stats.upcomingBusinesses} Upcoming</span>
          </div>
        </div>

        {/* Metric 2: New Enquiries */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
              New Enquiries
            </span>
            <div className="w-8 h-8 rounded-sm bg-amber-50 flex items-center justify-center text-amber-700">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-navy">
              {stats.newEnquiries}
            </span>
            <span className="text-xs text-amber-700 font-bold uppercase">Pending Review</span>
          </div>
          <div className="text-xs text-stone-500 border-t border-stone-100 pt-2 flex items-center justify-between">
            <span>{stats.totalEnquiries} Total Received</span>
            <span className="text-emerald-700 font-semibold">{stats.closedEnquiries} Resolved</span>
          </div>
        </div>

        {/* Metric 3: Active Jobs */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
              Active Job Openings
            </span>
            <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center text-blue-700">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-navy">
              {stats.activeJobs}
            </span>
            <span className="text-xs text-stone-400 font-medium">Positions Open</span>
          </div>
          <div className="text-xs text-stone-500 border-t border-stone-100 pt-2 flex items-center justify-between">
            <span>{stats.totalApplications} Candidates Applied</span>
            <Link href="/admin/careers" className="text-gold font-bold hover:underline">
              View &rarr;
            </Link>
          </div>
        </div>

        {/* Metric 4: Published News */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
              Published Press Releases
            </span>
            <div className="w-8 h-8 rounded-sm bg-purple-50 flex items-center justify-center text-purple-700">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-navy">
              {stats.publishedNews}
            </span>
            <span className="text-xs text-stone-400 font-medium">Articles Live</span>
          </div>
          <div className="text-xs text-stone-500 border-t border-stone-100 pt-2 flex items-center justify-between">
            <span>Official Media Center</span>
            <Link href="/admin/news" className="text-gold font-bold hover:underline">
              Manage &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Split Section: Recent Activities & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Enquiries Feed */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-navy">
                Recent Business Inquiries
              </h3>
              <p className="text-xs text-stone-400">
                Latest submissions from prospective clients, dealers, and partners.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-gold uppercase tracking-wider hover:underline"
            >
              All Enquiries &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentEnquiries.length === 0 ? (
              <p className="text-xs text-stone-400 py-4">No recent inquiries.</p>
            ) : (
              stats.recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-sm border border-stone-200/60 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-navy">{enq.title}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                          enq.status === "NEW"
                            ? "bg-amber-100 text-amber-800"
                            : enq.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1">{enq.subtitle}</p>
                  </div>
                  <span className="text-[11px] text-stone-400 shrink-0">
                    {formatDate(enq.time)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Portfolio Quick Status */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-navy">
                Group Portfolio Status
              </h3>
              <p className="text-xs text-stone-400">
                Operating companies published on Sangales.com
              </p>
            </div>
            <Link
              href="/admin/businesses"
              className="text-xs font-bold text-gold uppercase tracking-wider hover:underline"
            >
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-sm bg-offwhite border border-stone-200/60">
              <div>
                <p className="text-xs font-bold text-navy">Annamrit Foods</p>
                <p className="text-[10px] text-stone-500">Food &bull; Flagship Brand</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                PUBLISHED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-offwhite border border-stone-200/60">
              <div>
                <p className="text-xs font-bold text-navy">Sangales Farms</p>
                <p className="text-[10px] text-stone-500">Agriculture &amp; Sustainable Farming</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                PUBLISHED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-offwhite border border-stone-200/60">
              <div>
                <p className="text-xs font-bold text-navy">Sangales Enterprises</p>
                <p className="text-[10px] text-stone-500">Wholesale &amp; Institutional Supplies</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                PUBLISHED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-offwhite border border-stone-200/60">
              <div>
                <p className="text-xs font-bold text-navy">Sangales Trading</p>
                <p className="text-[10px] text-stone-500">Commodity Sourcing &amp; Distribution</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                PUBLISHED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-offwhite border border-stone-200/60">
              <div>
                <p className="text-xs font-bold text-navy">Sangales Packaging</p>
                <p className="text-[10px] text-stone-500">Food Packaging Solutions</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                PUBLISHED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-stone-50 border border-dashed border-stone-300">
              <div>
                <p className="text-xs font-bold text-stone-700">Sangales Digital &amp; Logistics</p>
                <p className="text-[10px] text-stone-400">Future Expansion Entities</p>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                UPCOMING
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

