"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, Lock, CheckCircle2 } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Content Manager" | "Enquiry Manager";
  status: "ACTIVE" | "INACTIVE";
  lastLogin: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: "u-1",
      name: "Sangales Super Administrator",
      email: "admin@sangales.com",
      role: "Super Admin",
      status: "ACTIVE",
      lastLogin: "Just now (Current session)",
    },
    {
      id: "u-2",
      name: "Operations Lead (Annamrit Foods)",
      email: "ops.annamrit@sangales.com",
      role: "Admin",
      status: "ACTIVE",
      lastLogin: "2026-10-25 14:10",
    },
    {
      id: "u-3",
      name: "Commercial Lead (Enterprises & Trading)",
      email: "commercial@sangales.com",
      role: "Enquiry Manager",
      status: "ACTIVE",
      lastLogin: "2026-10-24 18:32",
    },
    {
      id: "u-4",
      name: "Media & Press Coordinator",
      email: "media@sangales.com",
      role: "Content Manager",
      status: "ACTIVE",
      lastLogin: "2026-10-20 11:05",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Admin" as UserItem["role"],
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    setUsers([
      ...users,
      {
        id: `u-${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "ACTIVE",
        lastLogin: "Invitation Sent",
      },
    ]);
    setShowAdd(false);
    setNewUser({ name: "", email: "", role: "Admin" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Administrative Users &amp; Role Governance
          </h2>
          <p className="text-xs text-charcoal-100">
            Enforce role-based access control across portfolio operations and lead pipelines.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Provision User</span>
        </button>
      </div>

      {/* Role Definitions Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-sm border border-stone-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-navy block">Super Admin</span>
          <p className="text-xs text-stone-600 font-medium">Full governance, security, and global settings control.</p>
        </div>
        <div className="p-4 bg-white rounded-sm border border-stone-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-navy block">Admin</span>
          <p className="text-xs text-stone-600 font-medium">Manage portfolio businesses, products, and enquiries.</p>
        </div>
        <div className="p-4 bg-white rounded-sm border border-stone-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-navy block">Content Manager</span>
          <p className="text-xs text-stone-600 font-medium">Publish press releases, news updates, and milestone media.</p>
        </div>
        <div className="p-4 bg-white rounded-sm border border-stone-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-navy block">Enquiry Manager</span>
          <p className="text-xs text-stone-600 font-medium">Review customer leads, follow-ups, and commercial quotations.</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Designated Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/70">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-navy text-xs">{u.name}</p>
                    <p className="text-[11px] text-stone-400 font-mono">{u.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-navy text-gold text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-sm">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                    {u.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-sm border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading text-lg font-bold text-navy">
              Provision Administrator User
            </h3>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Vikram Shinde"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="vikram@sangales.com"
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                  Role Permission Scope
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-offwhite border border-stone-200 rounded-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Enquiry Manager">Enquiry Manager</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy text-gold text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gold hover:text-navy transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

