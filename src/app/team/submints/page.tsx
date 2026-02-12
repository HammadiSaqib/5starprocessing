"use client";

import { useEffect, useState } from "react";
import { Eye, FileText, Info, Save, XCircle } from "lucide-react";

interface SubRow {
  application_id: number;
  updated_at: string;
  user_id: number;
  name: string;
  email: string;
  user_status?: string;
  status_reason?: string | null;
  tag?: string | null;
  app_status: string;
}

interface PrequalDetail {
  industry?: string;
  processing_current?: number | boolean;
  monthly_volume?: number | null;
  us_citizen?: number | boolean;
  active_us_bank?: number | boolean;
  fees_payer?: string;
  tag?: string | null;
  status?: string;
}

interface SubmitDetail {
  data?: Record<string, unknown>;
}

export default function TeamSubmintsPage() {
  const [rows, setRows] = useState<SubRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewPrequal, setViewPrequal] = useState<PrequalDetail | null>(null);
  const [viewSubmit, setViewSubmit] = useState<SubmitDetail | null>(null);
  const [statusModal, setStatusModal] = useState<{ userId: number; status: string; reason?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/team/submints");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed");
        else setRows(data);
      } catch {
        setError("Failed");
      }
    })();
  }, []);

  async function openPrequal(appId: number) {
    const res = await fetch(`/api/team/application/${appId}`);
    const data = await res.json();
    if (res.ok) setViewPrequal(data);
  }

  async function openSubmit(appId: number) {
    const res = await fetch(`/api/team/submit/${appId}`);
    const data = await res.json();
    if (res.ok) setViewSubmit(data);
  }

  function openStatus(userId: number, current: string | undefined, reason?: string | null) {
    setStatusModal({ userId, status: (current ?? "Pending"), reason: (reason ?? "") });
  }

  async function saveStatus() {
    if (!statusModal) return;
    const normalized = statusModal.status === "Currently Posed" ? "Possed" : statusModal.status;
    const res = await fetch("/api/team/user-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: statusModal.userId, status: normalized, reason: statusModal.reason }),
    });
    if (res.ok) {
      setRows((prev) => prev.map(r => r.user_id === statusModal.userId ? { ...r, user_status: normalized, status_reason: statusModal.reason } : r));
      setStatusModal(null);
    }
  }

  function getUserStatusBadge(status?: string) {
    const s = (status || "Pending").toLowerCase();
    if (s === "approved") return "bg-emerald-50 text-emerald-700 border border-emerald-100";
    if (s === "possed") return "bg-violet-50 text-violet-700 border border-violet-100";
    if (s === "pending") return "bg-amber-50 text-amber-700 border border-amber-100";
    if (s === "declined") return "bg-red-50 text-red-700 border border-red-100";
    return "bg-slate-50 text-slate-700 border border-slate-100";
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Submissions</h1>
        <p className="text-slate-500 mt-1">Review and manage application submissions.</p>
      </div>
      {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-sm mb-3">{error}</div>}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-left text-slate-500 font-medium uppercase text-xs tracking-wider">
                <th className="py-4 px-6">Application</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Updated</th>
                <th className="py-4 px-6">Client Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(r => (
                <tr key={r.application_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">#{r.application_id}</td>
                  <td className="py-4 px-6 text-slate-700">{r.name}</td>
                  <td className="py-4 px-6 text-slate-500">{r.email}</td>
                  <td className="py-4 px-6 text-slate-500">{new Date(r.updated_at).toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getUserStatusBadge(r.user_status)}`}>
                        {r.user_status || "Pending"}
                      </span>
                      {r.status_reason && (
                        <div className="text-xs text-slate-400 truncate max-w-[200px]" title={r.status_reason}>
                          {r.status_reason}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openPrequal(r.application_id)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="View Prequal">
                        <Info className="w-4 h-4" />
                      </button>
                      <button onClick={() => openSubmit(r.application_id)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="View Submit Data">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button onClick={() => openStatus(r.user_id, r.user_status, r.status_reason)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Change Status">
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td className="py-12 px-6 text-center text-slate-500" colSpan={6}>
                    No submissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Prequal Modal */}
      {viewPrequal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-slate-900">Pre-Qual Data</h3>
              <button onClick={() => setViewPrequal(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs text-slate-500 uppercase">Industry</span>
                  <span className="font-medium text-slate-900">{viewPrequal.industry || "-"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs text-slate-500 uppercase">Current Processing</span>
                  <span className="font-medium text-slate-900">{viewPrequal.processing_current ? "Yes" : "No"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs text-slate-500 uppercase">Monthly Volume</span>
                  <span className="font-medium text-slate-900">{viewPrequal.monthly_volume || "-"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <span className="block text-xs text-slate-500 uppercase">US Citizen</span>
                  <span className="font-medium text-slate-900">{viewPrequal.us_citizen ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-slate-500 uppercase">Fees Payer</span>
                      <span className="font-medium text-slate-900">{viewPrequal.fees_payer || "-"}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 uppercase">Status</span>
                      <span className="font-medium text-slate-900">{viewPrequal.status || "-"}</span>
                    </div>
                 </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setViewPrequal(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* View Submit Modal */}
      {viewSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-slate-900">Submission Data</h3>
              <button onClick={() => setViewSubmit(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(viewSubmit.data || {}).map(([key, value]) => (
                  <div key={key} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
                      {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                    </span>
                    {value && typeof value === "object" && !Array.isArray(value) ? (
                      <div className="space-y-1">
                        {Object.entries(value as Record<string, unknown>).map(([subKey, subVal]) => (
                          <div key={subKey} className="flex items-start justify-between gap-3">
                            <span className="text-xs text-slate-500">
                              {subKey.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                            </span>
                            <span className="font-medium text-slate-900 break-words">
                              {subVal === null || subVal === undefined
                                ? "-"
                                : typeof subVal === "boolean"
                                ? subVal ? "Yes" : "No"
                                : String(subVal)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : Array.isArray(value) ? (
                      <div className="space-y-1">
                        {(value as unknown[]).map((item, i) => (
                          <div key={i} className="flex items-start justify-between gap-3">
                            <span className="text-xs text-slate-500">Item {i + 1}</span>
                            <span className="font-medium text-slate-900 break-words">
                              {item === null || item === undefined
                                ? "-"
                                : typeof item === "object"
                                ? JSON.stringify(item)
                                : String(item)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-medium text-slate-900 break-words">
                        {value === null || value === undefined
                          ? "-"
                          : typeof value === "boolean"
                          ? value ? "Yes" : "No"
                          : String(value)}
                      </span>
                    )}
                  </div>
                ))}
                {Object.keys(viewSubmit.data || {}).length === 0 && (
                  <div className="col-span-full text-center py-8 text-slate-500">
                    No data available
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setViewSubmit(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      {statusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Change User Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={statusModal.status}
                  onChange={(e) => setStatusModal({ ...statusModal, status: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                  <option value="Currently Posed">Currently Posed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason (Optional)</label>
                <input
                  type="text"
                  value={statusModal.reason || ""}
                  onChange={(e) => setStatusModal({ ...statusModal, reason: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  placeholder="Enter reason..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setStatusModal(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Cancel</button>
                <button onClick={saveStatus} className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 shadow-lg shadow-brand-600/20">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
