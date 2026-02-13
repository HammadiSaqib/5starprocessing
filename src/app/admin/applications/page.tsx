"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Download,
  Share,
  X,
  CheckCircle,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  MoreVertical,
  Search,
  Menu,
  Bell,
  ChevronRight,
  FileText,
  Clock,
  XCircle,
  Check,
  TrendingUp
} from "lucide-react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";

interface AdminApp {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  status: string;
  tag?: string | null;
  industry?: string | null;
  created_at?: string;
  custom_support_number?: string | null;
}

const getStatusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "declined") return "bg-red-100 text-red-700 border-red-200";
  if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
  if (s === "possed") return "bg-violet-100 text-violet-700 border-violet-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<AdminApp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedAppForSupport, setSelectedAppForSupport] = useState<AdminApp | null>(null);
  const [supportNumberInput, setSupportNumberInput] = useState("");
  const [savingSupport, setSavingSupport] = useState(false);
  const [supportNumbers, setSupportNumbers] = useState<{ id: number; number: string; label?: string | null }[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/applications");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to load applications");
        else setApps(data as AdminApp[]);
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!showSupportModal) return;
      try {
        const res = await fetch("/api/support-numbers");
        if (res.ok) {
          const data = await res.json();
          setSupportNumbers(Array.isArray(data) ? data : []);
        }
      } catch {}
    })();
  }, [showSupportModal]);

  const shareUrl = "http://localhost:3000/admin-ref/signup";

  const shareOptions = [
    { name: "Copy Link", icon: Copy, action: () => { navigator.clipboard.writeText(shareUrl); }, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
    { name: "Email", icon: Mail, action: () => window.open(`mailto:?subject=Join%20Us&body=${encodeURIComponent(shareUrl)}`), color: "bg-red-50 text-red-600 hover:bg-red-100" },
    { name: "WhatsApp", icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`), color: "bg-green-50 text-green-600 hover:bg-green-100" },
    { name: "Facebook", icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`), color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { name: "Twitter", icon: Twitter, action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`), color: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
    { name: "LinkedIn", icon: Linkedin, action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`), color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
  ];

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.tag || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openSupportModal = (app: AdminApp) => {
    setSelectedAppForSupport(app);
    setSupportNumberInput(app.custom_support_number || "");
    setShowSupportModal(true);
  };

  const saveSupportNumber = async () => {
    if (!selectedAppForSupport) return;
    setSavingSupport(true);
    try {
      const res = await fetch("/api/admin/users/support-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedAppForSupport.user_id, customSupportNumber: supportNumberInput }),
      });
      if (res.ok) {
        setApps(apps.map(a => a.id === selectedAppForSupport.id ? { ...a, custom_support_number: supportNumberInput } : a));
        setShowSupportModal(false);
        setSupportNumberInput("");
        setSelectedAppForSupport(null);
      } else {
        alert("Failed to update support number");
      }
    } catch {
      alert("Error saving support number");
    } finally {
      setSavingSupport(false);
    }
  };

  // Stats calculation
  const stats = [
    { 
      label: "Total Applications", 
      value: apps.length, 
      icon: FileText, 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      bgGradient: "from-blue-50 to-white",
      trend: "+12%", 
      trendColor: "text-emerald-600" 
    },
    { 
      label: "Pending Review", 
      value: apps.filter(a => (a.status || "").toLowerCase() === "pending").length, 
      icon: Clock, 
      color: "text-amber-600", 
      bg: "bg-amber-100", 
      bgGradient: "from-amber-50 to-white",
      trend: "+5%", 
      trendColor: "text-emerald-600" 
    },
    { 
      label: "Approved", 
      value: apps.filter(a => (a.status || "").toLowerCase() === "approved").length, 
      icon: CheckCircle, 
      color: "text-emerald-600", 
      bg: "bg-emerald-100", 
      bgGradient: "from-emerald-50 to-white",
      trend: "+8%", 
      trendColor: "text-emerald-600" 
    },
    { 
      label: "Declined", 
      value: apps.filter(a => (a.status || "").toLowerCase() === "declined").length, 
      icon: XCircle, 
      color: "text-red-600", 
      bg: "bg-red-100", 
      bgGradient: "from-red-50 to-white",
      trend: "-2%", 
      trendColor: "text-red-600" 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 50
      }
    }
  };

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
              {pathname?.split("/").slice(2).join(" ") || "Applications"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Global search..."
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
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
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
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`relative overflow-hidden p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br ${stat.bgGradient}`}
                  >
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white ${stat.trendColor} flex items-center gap-1 shadow-sm border border-slate-100`}>
                        <TrendingUp className="w-3 h-3" /> {stat.trend}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-slate-500 text-sm font-semibold mb-1 tracking-wide uppercase text-[11px]">{stat.label}</h3>
                      <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                    </div>
                    <stat.icon className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.03] ${stat.color} transform -rotate-12 pointer-events-none`} />
                  </motion.div>
                ))}
              </div>

              {/* Main Table Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Application Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage and review all incoming applications.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition-colors border border-slate-200 shadow-sm hover:shadow">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition-colors shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button 
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition-colors shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30"
                    >
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Industry/Tag</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Support #</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm border border-brand-100">
                                {app.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{app.name}</p>
                                <p className="text-sm text-slate-500">{app.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-slate-900 font-medium">{app.industry || "N/A"}</span>
                              {app.tag && (
                                <span className="inline-flex w-fit px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                                  {app.tag}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                            {new Date(app.created_at || Date.now()).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(app.status)}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'approved' ? 'bg-emerald-500' : app.status === 'declined' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {app.custom_support_number ? (
                              <button 
                                onClick={() => openSupportModal(app)}
                                className="text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors bg-slate-50 hover:bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm"
                              >
                                {app.custom_support_number}
                              </button>
                            ) : (
                              <button 
                                onClick={() => openSupportModal(app)}
                                className="text-xs font-medium text-slate-400 hover:text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-brand-100"
                              >
                                + Add Number
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredApps.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-3">
                              <Search className="w-8 h-8 opacity-20" />
                              <p>No applications found matching your search.</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
                  <span>Showing {filteredApps.length} entries</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-md w-full p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-brand-400"></div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-brand-100">
                  <Share className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Share Application</h3>
                <p className="text-slate-500 mt-2">Share the application link with your network.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {shareOptions.map((option, i) => (
                  <button
                    key={i}
                    onClick={option.action}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg ${option.color}`}
                  >
                    <option.icon className="w-6 h-6" />
                    <span className="text-xs font-semibold">{option.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Number Modal */}
      <AnimatePresence>
        {showSupportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSupportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-sm w-full p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowSupportModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-slate-900 mb-6">Assign Support Number</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Custom Number</label>
                  <input
                    type="text"
                    value={supportNumberInput}
                    onChange={(e) => setSupportNumberInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                
                {supportNumbers.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Quick Select</label>
                    <div className="flex flex-wrap gap-2">
                      {supportNumbers.map(sn => (
                        <button
                          key={sn.id}
                          onClick={() => setSupportNumberInput(sn.number)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors"
                        >
                          {sn.label ? `${sn.label} (${sn.number})` : sn.number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={saveSupportNumber}
                  disabled={savingSupport}
                  className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {savingSupport ? "Saving..." : "Save Number"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
