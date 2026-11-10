"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, Lock, CheckCircle2, AlertCircle, KeyRound, Eye, EyeOff } from "lucide-react";

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
      lastLogin: "Active Session",
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

  // Password Change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(null);

    if (newPassword !== confirmPassword) {
      setPwError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters long.");
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setPwSuccess("Administrator password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwError(err.message || "Failed to update password.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">
            Administrative Users &amp; Access Governance
          </h2>
          <p className="text-xs text-charcoal-100">
            Enforce role-based access control and manage executive security credentials.
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
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-navy">
            Active Corporate Accounts
          </h3>
          <span className="text-xs text-stone-500 font-medium">{users.length} Authorized Users</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-6">Designated Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-charcoal">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/70">
                  <td className="py-3.5 px-6">
                    <p className="font-bold text-navy text-xs">{u.name}</p>
                    <p className="text-[11px] text-stone-400 font-mono">{u.email}</p>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 bg-navy text-gold text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-sm">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-stone-500 font-mono text-[11px]">
                    {u.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Management Card */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-navy text-gold flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-navy">
                Administrator Password Security
              </h3>
              <p className="text-xs text-charcoal-100">
                Update the master administrator credentials for access to sangales.com/admin.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-xs text-stone-500 hover:text-navy flex items-center gap-1 font-semibold"
          >
            {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPasswords ? "Hide Passwords" : "Show Passwords"}</span>
          </button>
        </div>

        <form onSubmit={handlePasswordChange} className="p-6 space-y-4 max-w-xl">
          {pwError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{pwError}</span>
            </div>
          )}

          {pwSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{pwSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter existing password"
              className="w-full px-3.5 py-2.5 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2.5 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2.5 text-xs bg-offwhite border border-stone-200 rounded-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={pwLoading}
              className="px-6 py-2.5 bg-navy hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm disabled:opacity-50"
            >
              {pwLoading ? "Updating Password..." : "Save New Password"}
            </button>
          </div>
        </form>
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
