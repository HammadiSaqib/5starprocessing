"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Mail, 
  Phone, 
  X, 
  Menu, 
  Search, 
  Bell
} from "lucide-react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";

interface AdminAffiliate { 
  id: number; 
  name: string; 
  email: string; 
  phone?: string | null; 
  affiliate_status?: string; 
  referral_count?: number; 
  created_at?: string; 
}

interface ReferralClient { 
  id: number; 
  name: string; 
  email: string; 
  status?: string; 
  created_at?: string 
}

const getStatusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
};

export default function AffiliateManagementPage() {
  const [affiliates, setAffiliates] = useState<AdminAffiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const [selectedAffiliate, setSelectedAffiliate] = useState<AdminAffiliate | null>(null);
  const [referrals, setReferrals] = useState<ReferralClient[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const fetchAffiliates = async () => {
    try {
      const res = await fetch("/api/admin/affiliates");
      if (res.ok) {
        const data = await res.json();
        setAffiliates(data);
      } else {
        setError("Failed to load affiliates");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchReferrals = async (affiliateId: number) => {
    setLoadingReferrals(true);
    setReferrals([]);
    try {
      const res = await fetch(`/api/admin/affiliates/${affiliateId}/referrals`);
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
      }
    } catch {} finally {
      setLoadingReferrals(false);
    }
  };

  const handleAffiliateClick = (affiliate: AdminAffiliate) => {
    setSelectedAffiliate(affiliate);
    fetchReferrals(affiliate.id);
  };

  const handleApprove = async (affiliate: AdminAffiliate, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/admin/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: affiliate.id, status: "approved" }),
      });
      if (res.ok) {
        setAffiliates(prev => prev.map(a => a.id === affiliate.id ? { ...a, affiliate_status: "approved" } : a));
      }
    } catch {
      alert("Failed to approve");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50 } }
  };

  const filteredAffiliates = affiliates.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative custom-scrollbar">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 capitalize tracking-tight">
              Affiliates
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Search affiliates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm w-64 transition-all outline-none border"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-all hover:scale-105 active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium shadow-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Affiliates Table */}
              <motion.div variants={itemVariants} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Affiliate Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Review and manage affiliate partners.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Affiliate Profile</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Referrals</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAffiliates.map((affiliate) => (
                        <tr 
                          key={affiliate.id} 
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          onClick={() => handleAffiliateClick(affiliate)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100 transition-colors">
                                {affiliate.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{affiliate.name}</p>
                                <p className="text-xs text-slate-500">Joined {new Date(affiliate.created_at || "").toLocaleDateString()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 text-sm text-slate-500">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                <span>{affiliate.email}</span>
                              </div>
                              {affiliate.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{affiliate.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(affiliate.affiliate_status || "")}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${affiliate.affiliate_status === "approved" ? "bg-emerald-500" : "bg-amber-400"}`}></span>
                              {affiliate.affiliate_status || "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{affiliate.referral_count || 0}</p>
                                <p className="text-[10px] uppercase font-semibold text-slate-400">Clients</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {affiliate.affiliate_status !== "approved" && (
                                <button 
                                    onClick={(e) => handleApprove(affiliate, e)}
                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors border border-emerald-200"
                                >
                                    Approve
                                </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredAffiliates.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            <p>No affiliates found.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Affiliate Details Modal */}
      <AnimatePresence>
        {selectedAffiliate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAffiliate(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-2xl w-full p-8 shadow-2xl max-h-[80vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedAffiliate.name}</h3>
                  <p className="text-slate-500 mt-1">Affiliate Performance & Referrals</p>
                </div>
                <button onClick={() => setSelectedAffiliate(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loadingReferrals ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <p className="text-2xl font-black text-slate-900">{referrals.length}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Referrals</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                      <p className="text-2xl font-black text-emerald-600">
                        {referrals.filter(c => (c.status || "").toLowerCase() === "approved").length}
                      </p>
                      <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-wide">Approved</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                      <p className="text-2xl font-black text-amber-600">
                        {referrals.filter(c => (c.status || "").toLowerCase() === "pending").length}
                      </p>
                      <p className="text-xs font-bold text-amber-600/70 uppercase tracking-wide">Pending</p>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-500" />
                    Referral History
                  </h4>
                  
                  <div className="space-y-3">
                    {referrals.map(client => (
                      <div key={client.id} className="p-4 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{client.name}</p>
                            <p className="text-xs text-slate-500">{client.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(client.status || "")}`}>
                            {client.status || "Pending"}
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1">{new Date(client.created_at || "").toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {referrals.length === 0 && (
                      <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        No referrals found for this affiliate.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
