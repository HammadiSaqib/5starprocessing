"use client";

import { useEffect, useState } from "react";

interface TeamApp {
  id: number;
  user_id: number;
  status: string;
  tag?: string | null;
  name: string;
  email: string;
  phone?: string | null;
}

export default function TeamOverviewPage() {
  const [apps, setApps] = useState<TeamApp[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/team/applications");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed");
        else setApps(data);
      } catch {
        setError("Failed");
      }
    })();
  }, []);
  const total = apps.length;
  const statusCount = (s: string) => apps.filter(a => String(a.status) === s).length;
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500 mt-1">Platform activity and application metrics.</p>
      </div>
      {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-sm mb-3">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Applicants</div>
          <div className="text-3xl font-bold text-slate-900">{total}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Pre‑Qual</div>
          <div className="text-3xl font-bold text-slate-900">{statusCount("prequal")}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Application</div>
          <div className="text-3xl font-bold text-slate-900">{statusCount("application") + statusCount("resubmission")}</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Under Review</div>
          <div className="text-3xl font-bold text-slate-900">{statusCount("under_review")}</div>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
        </div>
        <div className="p-6 space-y-3">
          {apps.slice(0, 10).map(a => (
            <div key={a.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <div>
                <div className="font-semibold text-slate-900">{a.name}</div>
                <div className="text-sm text-slate-500">{a.email}</div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600 capitalize">
                  {a.status.replace("_", " ")}
                </div>
                {a.tag && <div className="text-xs text-slate-400 mt-1">Tag: {a.tag}</div>}
              </div>
            </div>
          ))}
          {!apps.length && <div className="text-slate-500 text-center py-8">No records found</div>}
        </div>
      </div>
    </div>
  );
}
