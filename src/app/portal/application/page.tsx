"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Landmark, 
  FileText, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  ChevronRight
} from "lucide-react";

type Section = "company" | "ownership" | "banking" | "documents" | "review";

export default function ApplicationPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("company");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<string>("application");
  const [tag, setTag] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(true);

  const [company, setCompany] = useState({ legalName: "", dba: "", address: "" });
  const [ownership, setOwnership] = useState({ ownerName: "", percent: 0 });
  const [banking, setBanking] = useState({ bankName: "", routing: "", account: "" });
  const [uploading, setUploading] = useState(false);
  interface DocumentItem { id: number; doc_type: string; file_path: string; status: string }
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function saveSection(s: Section, data: unknown) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", section: s, data }),
      });
      if (!res.ok) setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function submitApplication() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit" }),
      });
      if (res.ok) {
        setSubmitted(true);
        router.replace("/dashboard");
      } else {
        setError("Submit failed");
      }
    } finally {
      setSaving(false);
    }
  }

  async function uploadDoc(docType: string, file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("docType", docType);
      fd.append("file", file);
      const res = await fetch("/api/portal/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Upload failed");
      else {
        setDocuments((d) => [
          { id: data.id, doc_type: docType, file_path: data.filePath, status: "uploaded" },
          ...d,
        ]);
      }
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/application");
        if (res.ok) {
          const data = await res.json();
          setStatus(String(data.status || "application"));
          setTag(data.tag || null);
          setDocuments(Array.isArray(data.documents) ? data.documents : []);
          if (data.status === "video" || data.status === "prequal") {
            router.replace("/portal/video");
            return;
          }
          if (data.status === "disqualified") {
            router.replace("/portal/disqualified");
            return;
          }
          if (data.status === "under_review" || data.status === "approved") {
            setSubmitted(true);
            setEditable(false);
          } else {
            setSubmitted(false);
            setEditable(true);
          }
        }
      } catch {}
    })();
  }, [router]);

  useEffect(() => {
    if (editable) saveSection("company", company);
  }, [company, editable]);
  useEffect(() => {
    if (editable) saveSection("ownership", ownership);
  }, [ownership, editable]);
  useEffect(() => {
    if (editable) saveSection("banking", banking);
  }, [banking, editable]);

  const navItems = [
    { id: "company", label: "Company Info", icon: Building2 },
    { id: "ownership", label: "Ownership", icon: Users },
    { id: "banking", label: "Banking", icon: Landmark },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "review", label: "Review & Submit", icon: Send },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Merchant Application</h1>
            <p className="text-slate-500 mt-1">Complete the details below to proceed with your application.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-slate-600 shadow-sm">
                Status: <span className="text-blue-600">{status.replace("_", " ")}</span>
             </div>
             {tag && (
               <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 text-sm font-medium text-blue-700 shadow-sm">
                 {tag}
               </div>
             )}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-slate-50 border-r border-gray-100 p-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id as Section)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive 
                      ? "bg-white text-blue-600 shadow-md border border-gray-100" 
                      : "text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
                </button>
              );
            })}
          </div>

          {/* Form Area */}
          <div className="lg:col-span-9 p-8 md:p-12 bg-white relative">
            {!editable && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p>Your application is currently locked for review. Editing is disabled.</p>
              </div>
            )}
            
            <motion.div
              key={section}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                {navItems.find(n => n.id === section)?.label}
              </h2>

              <div className="flex-1 space-y-6 max-w-2xl">
                {section === "company" && (
                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Legal Name</label>
                      <input 
                        placeholder="e.g. Acme Corp LLC" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={company.legalName} 
                        onChange={(e)=>setCompany({...company, legalName:e.target.value})} 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">DBA (Doing Business As)</label>
                      <input 
                        placeholder="e.g. Acme Solutions" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={company.dba} 
                        onChange={(e)=>setCompany({...company, dba:e.target.value})} 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Business Address</label>
                      <input 
                        placeholder="123 Business St, Suite 100" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={company.address} 
                        onChange={(e)=>setCompany({...company, address:e.target.value})} 
                      />
                    </div>
                  </div>
                )}

                {section === "ownership" && (
                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Owner Full Name</label>
                      <input 
                        placeholder="John Doe" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={ownership.ownerName} 
                        onChange={(e)=>setOwnership({...ownership, ownerName:e.target.value})} 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ownership Percentage</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="50" 
                          disabled={!editable} 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60 pr-12"
                          value={ownership.percent} 
                          onChange={(e)=>setOwnership({...ownership, percent:Number(e.target.value)})} 
                        />
                        <span className="absolute right-4 top-3.5 text-slate-400 font-medium">%</span>
                      </div>
                    </div>
                  </div>
                )}

                {section === "banking" && (
                  <div className="space-y-5">
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bank Name</label>
                      <input 
                        placeholder="Chase, Bank of America, etc." 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={banking.bankName} 
                        onChange={(e)=>setBanking({...banking, bankName:e.target.value})} 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Routing Number</label>
                      <input 
                        placeholder="9 digits" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={banking.routing} 
                        onChange={(e)=>setBanking({...banking, routing:e.target.value})} 
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Account Number</label>
                      <input 
                        placeholder="Account number" 
                        disabled={!editable} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none disabled:opacity-60"
                        value={banking.account} 
                        onChange={(e)=>setBanking({...banking, account:e.target.value})} 
                      />
                    </div>
                  </div>
                )}

                {section === "documents" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: "Bank Statement", type: "bank_statement" },
                        { label: "Driver License", type: "driver_license" },
                        { label: "Voided Check", type: "voided_check" }
                      ].map((doc) => (
                        <div key={doc.type} className="border border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer relative group">
                           <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                           <div className="text-sm font-medium text-slate-700">{doc.label}</div>
                           <div className="text-xs text-slate-400 mt-1">Click to upload</div>
                           <input 
                             type="file" 
                             disabled={!editable} 
                             className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                             onChange={(e)=>e.target.files && uploadDoc(doc.type, e.target.files[0])} 
                           />
                        </div>
                      ))}
                    </div>

                    {uploading && (
                      <div className="flex items-center gap-2 text-blue-600 text-sm bg-blue-50 p-3 rounded-lg">
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading document...
                      </div>
                    )}

                    {documents.length > 0 && (
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr className="text-left text-slate-500">
                              <th className="py-3 px-4 font-medium">Type</th>
                              <th className="py-3 px-4 font-medium">Status</th>
                              <th className="py-3 px-4 font-medium">File</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {documents.map((d)=>(
                              <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-slate-700 font-medium capitalize">{d.doc_type.replace("_", " ")}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {d.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <a href={d.file_path} className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1" target="_blank" rel="noreferrer">
                                    <FileText className="w-3 h-3" /> View
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {section === "review" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Submit?</h3>
                      <p className="text-blue-700 mb-6 text-sm leading-relaxed">
                        Please review all your information before submitting. Once submitted, your application will be sent to our underwriting team for review.
                      </p>
                      
                      <button 
                        disabled={saving || !editable} 
                        onClick={submitApplication} 
                        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {submitted && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <div>
                          <div className="font-semibold">Application Submitted</div>
                          <div className="text-sm text-emerald-700">Your application is now under review.</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}
                
                {saving && !uploading && section !== "review" && (
                  <div className="fixed bottom-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 text-sm text-slate-500 animate-fade-in">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> Saving changes...
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
