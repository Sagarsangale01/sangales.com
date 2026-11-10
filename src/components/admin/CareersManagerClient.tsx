"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit3, Trash2, Briefcase, Users, FileText, CheckCircle, X, ExternalLink } from "lucide-react";
import { CareerRecord } from "@/lib/data";
import { ApplicationRecord } from "@/lib/store";
import { formatDate } from "@/lib/utils";

interface Props {
  initialCareers: CareerRecord[];
  initialApplications: ApplicationRecord[];
  businesses: { id: string; name: string }[];
}

export default function CareersManagerClient({
  initialCareers,
  initialApplications,
  businesses,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"JOBS" | "APPLICATIONS">("JOBS");
  const [careers, setCareers] = useState<CareerRecord[]>(initialCareers);
  const [applications, setApplications] = useState<ApplicationRecord[]>(initialApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerRecord | null>(null);

  const [jobForm, setJobForm] = useState<Partial<CareerRecord>>({
    title: "",
    slug: "",
    businessName: businesses[0]?.name || "Corporate Group",
    department: "Operations",
    location: "Maharashtra, India",
    employmentType: "Full-time",
    description: "",
    status: "PUBLISHED",
  });

  const openCreate = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      slug: "",
      businessName: businesses[0]?.name || "Corporate Group",
      department: "Commercial & Sales",
      location: "Maharashtra, India",
      employmentType: "Full-time",
      description: "",
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const res = await fetch(`/api/careers/${editingJob.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobForm),
        });
        const data = await res.json();
        if (data.success) {
          setCareers(careers.map((c) => (c.id === editingJob.id ? data.career : c)));
          setIsModalOpen(false);
          router.refresh();
        }
      } else {
        const res = await fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobForm),
        });
        const data = await res.json();
        if (data.success) {
          setCareers([data.career, ...careers]);
          setIsModalOpen(false);
          router.refresh();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!confirm(`Delete opening "${title}"?`)) return;
    try {
      const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCareers(careers.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Switch Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Careers &amp; Candidate Portal
          </h2>
          <p className="text-xs text-charcoal-100">
            Publish job openings and review candidate resumes across group companies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 bg-stone-200 rounded-sm flex items-center">
            <button
              onClick={() => setActiveTab("JOBS")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === "JOBS" ? "bg-white text-navy shadow-sm" : "text-stone-600"
              }`}
            >
              Openings ({careers.length})
            </button>
            <button
              onClick={() => setActiveTab("APPLICATIONS")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                activeTab === "APPLICATIONS" ? "bg-white text-navy shadow-sm" : "text-stone-600"
              }`}
            >
              Candidates ({applications.length})
            </button>
          </div>

          {activeTab === "JOBS" && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Post Job</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Job Openings */}
      {activeTab === "JOBS" ? (
        <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Title &amp; Role</th>
                  <th className="py-3 px-4">Operating Division</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-charcoal">
                {careers.map((job) => (
                  <tr key={job.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-navy text-xs">{job.title}</p>
                      <p className="text-[11px] text-stone-400">{job.department}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-xs text-navy">
                      {job.businessName}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{job.location}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-sm font-semibold text-[10px]">
                        {job.employmentType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase ${
                          job.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setJobForm({ ...job });
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-stone-500 hover:text-navy rounded-sm"
                        title="Edit opening"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-sm"
                        title="Delete opening"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Tab 2: Candidate Applications */
        <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Position Applied</th>
                  <th className="py-3 px-4">Resume / Profile</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-charcoal">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-navy text-xs">{app.fullName}</p>
                      <p className="text-[11px] text-stone-500">{app.email} &bull; {app.phone}</p>
                      {app.coverLetter && (
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-1 italic">
                          "{app.coverLetter}"
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-navy text-xs">
                      {app.jobTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gold-700 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Resume Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] uppercase rounded-sm">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">
                      {formatDate(app.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Post/Edit Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-navy p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveJob} noValidate className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-navy">
                {editingJob ? "Edit Job Opening" : "Create Career Opportunity"}
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Operating Entity
                  </label>
                  <select
                    value={jobForm.businessName}
                    onChange={(e) => setJobForm({ ...jobForm, businessName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  >
                    <option value="Sangales Corporate Group">Sangales Corporate Group</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Employment Type
                  </label>
                  <select
                    value={jobForm.employmentType}
                    onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Job Description &amp; Scope <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

