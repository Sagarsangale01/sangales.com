"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  X,
  FileText,
} from "lucide-react";
import { EnquiryRecord } from "@/lib/store";
import { formatDate } from "@/lib/utils";

interface Props {
  initialEnquiries: EnquiryRecord[];
  businesses: { id: string; name: string }[];
}

export default function EnquiryManagerClient({ initialEnquiries, businesses }: Props) {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [businessFilter, setBusinessFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [updating, setUpdating] = useState(false);

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
      const matchBiz = businessFilter === "ALL" || e.businessId === businessFilter;
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        e.fullName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        (e.companyName && e.companyName.toLowerCase().includes(q)) ||
        (e.subject && e.subject.toLowerCase().includes(q));
      return matchStatus && matchBiz && matchSearch;
    });
  }, [enquiries, statusFilter, businessFilter, search]);

  const openDetail = (enq: EnquiryRecord) => {
    setSelectedEnquiry(enq);
    setNoteInput(enq.adminNotes || "");
  };

  const handleStatusChange = async (newStatus: EnquiryRecord["status"]) => {
    if (!selectedEnquiry) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes: noteInput }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e)));
        setSelectedEnquiry(data.enquiry);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedEnquiry.status, adminNotes: noteInput }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(enquiries.map((e) => (e.id === selectedEnquiry.id ? data.enquiry : e)));
        setSelectedEnquiry(data.enquiry);
        alert("Internal notes updated successfully.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = () => {
    const headers = ["ID,Date,Full Name,Email,Phone,Company,Type,Business,Status,Notes\n"];
    const rows = filtered.map((e) =>
      `"${e.id}","${e.createdAt}","${e.fullName}","${e.email}","${e.phone}","${e.companyName || ""}","${e.enquiryType}","${e.businessName || "Group"}","${e.status}","${(e.adminNotes || "").replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.join(""), rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sangales-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Commercial Enquiries &amp; Leads
          </h2>
          <p className="text-xs text-charcoal-100">
            Track, filter, update resolution status, and maintain internal notes for all leads.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 text-navy text-xs font-bold uppercase tracking-wider rounded-sm transition-all border border-stone-300 shadow-sm"
        >
          <Download className="w-4 h-4 text-gold-700" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="IN_DISCUSSION">IN DISCUSSION</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="CONVERTED">CONVERTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <select
            value={businessFilter}
            onChange={(e) => setBusinessFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none"
          >
            <option value="ALL">All Businesses</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <span className="text-xs text-stone-500 font-semibold">
            {filtered.length} Leads
          </span>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Prospect / Company</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Target Business</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px] whitespace-nowrap">
                    {formatDate(enq.createdAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-navy">{enq.fullName}</p>
                    <p className="text-[11px] text-stone-500">{enq.email} &bull; {enq.phone}</p>
                    {enq.companyName && (
                      <p className="text-[10px] text-stone-400 font-medium">{enq.companyName}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-sm font-semibold text-[10px] uppercase">
                      {enq.enquiryType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy text-xs">
                    {enq.businessName || "Corporate Group"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase tracking-wider ${
                        enq.status === "NEW"
                          ? "bg-amber-100 text-amber-800"
                          : enq.status === "CONTACTED"
                          ? "bg-purple-100 text-purple-800"
                          : enq.status === "IN_DISCUSSION" || enq.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : enq.status === "CONVERTED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {enq.status === "IN_DISCUSSION" ? "IN DISCUSSION" : enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openDetail(enq)}
                      className="px-3 py-1 bg-navy hover:bg-gold hover:text-navy text-white text-[11px] font-bold uppercase rounded-sm transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Detail Slide-Over Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-navy text-gold text-[10px] font-bold uppercase tracking-wider rounded-sm">
                  {selectedEnquiry.enquiryType}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {formatDate(selectedEnquiry.createdAt)}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-navy mt-1">
                {selectedEnquiry.subject || `Enquiry from ${selectedEnquiry.fullName}`}
              </h3>
            </div>

            {/* Prospect Snapshot */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-sm border border-stone-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Prospect</span>
                <p className="font-bold text-navy">{selectedEnquiry.fullName}</p>
                <p className="text-stone-600">{selectedEnquiry.companyName || "Independent"}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Contact Info</span>
                <p className="text-stone-700">{selectedEnquiry.email}</p>
                <p className="text-stone-700">{selectedEnquiry.phone}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Full Inquiry Message
              </span>
              <div className="p-4 bg-offwhite rounded-sm border border-stone-200 text-xs sm:text-sm text-charcoal leading-relaxed whitespace-pre-line">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Update Pipeline Status
              </span>
              <div className="flex flex-wrap gap-2">
                {(["NEW", "CONTACTED", "IN_DISCUSSION", "CONVERTED", "CLOSED"] as const).map((st) => (
                  <button
                    key={st}
                    disabled={updating}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                      selectedEnquiry.status === st || (st === "IN_DISCUSSION" && selectedEnquiry.status === "IN_PROGRESS")
                        ? "bg-navy text-gold shadow-sm ring-2 ring-gold"
                        : "bg-stone-100 hover:bg-stone-200 text-charcoal"
                    }`}
                  >
                    {st === "IN_DISCUSSION" ? "IN DISCUSSION" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Internal Administrative Notes &amp; Follow-Up Log
              </label>
              <textarea
                rows={3}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Log internal follow-up steps, phone call outcomes, quote status..."
                className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={updating}
                className="px-4 py-1.5 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-colors disabled:opacity-50"
              >
                {updating ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
