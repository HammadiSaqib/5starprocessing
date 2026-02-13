 "use client";
 
 import { useEffect, useState } from "react";
 import Link from "next/link";
 import { motion, AnimatePresence } from "framer-motion";
import { FileText, Clock, CheckCircle, ShieldAlert, TrendingUp, Activity, Briefcase, Menu, Search, Bell, Users, Eye, MoreHorizontal, ArrowRight, Zap, Server, Database, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";

interface AdminApp {
  id: number;
  user_id: number;
  name: string;
  email: string;
  status: string;
  tag?: string | null;
  industry?: string | null;
  created_at?: string;
}

export default function AdminOverviewPage() {
  const [apps, setApps] = useState<AdminApp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/applications");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to load data");
        else setApps(data as AdminApp[]);
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalApps = apps.length;
  const pendingApps = apps.filter(a => (a.status || "pending").toLowerCase() === "pending").length;
  const approvedApps = apps.filter(a => (a.status || "").toLowerCase() === "approved").length;
  const highRiskApps = apps.filter(a => (a.industry || "").toLowerCase().includes("high")).length;

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100";
    if (s === "declined") return "bg-red-100 text-red-700 border-red-200 shadow-sm shadow-red-100";
    if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200 shadow-sm shadow-amber-100";
    if (s === "possed") return "bg-violet-100 text-violet-700 border-violet-200 shadow-sm shadow-violet-100";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.tag || "").toLowerCase().includes(searchTerm.toLowerCase())
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
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 capitalize tracking-tight">
              {pathname?.startsWith("/admin/overview") ? "System Overview" : "Admin"}
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
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm w-64 transition-all outline-none border shadow-sm"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
          </div>
        </header>
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Stats Cards - Modern & Dynamic */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Applications", value: totalApps, icon: FileText, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%", trendColor: "text-emerald-600", bgGradient: "from-blue-50 to-white" },
                { label: "Pending Review", value: pendingApps, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: "+5", trendColor: "text-amber-600", bgGradient: "from-amber-50 to-white" },
                { label: "Approved Clients", value: approvedApps, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+8%", trendColor: "text-emerald-600", bgGradient: "from-emerald-50 to-white" },
                { label: "High Risk Ind.", value: highRiskApps, icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50", trend: "+2", trendColor: "text-rose-600", bgGradient: "from-rose-50 to-white" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 50, delay: i * 0.1 }}
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
                  {/* Decorative background icon */}
                  <stat.icon className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.03] ${stat.color} transform -rotate-12 pointer-events-none`} />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recent Submissions - Enhanced Table */}
              <motion.div className="xl:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 overflow-hidden flex flex-col h-full">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-xl sticky top-0 z-10">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-brand-500" />
                      Recent Submissions
                    </h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">Latest application updates</p>
                  </div>
                  <Link
                    href="/admin/applications"
                    className="group flex items-center gap-2 text-sm text-brand-600 font-bold hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-all"
                  >
                    View All
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex-1 overflow-x-auto custom-scrollbar p-2 ">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-slate-400 text-[11px] uppercase font-bold tracking-wider rounded-xl">
                      <tr>
                        <th className="px-6 py-4 rounded-l-xl">Applicant</th>
                        <th className="px-6 py-4">Industry</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 rounded-r-xl text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm  py-6">
                      {filteredApps.slice(0, 6).map((app, index) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={app.id} 
                          className="group hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-50 last:border-0"
                        >
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold shadow-sm border border-white group-hover:scale-110 transition-transform">
                                {app.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{app.name}</p>
                                <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 w-fit border border-slate-100">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-slate-600 font-medium text-xs">{app.industry || "General"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border ${getStatusColor(app.status)} inline-flex items-center gap-1.5`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'approved' ? 'bg-emerald-500' : app.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <Link 
                              href={`/admin/applications?id=${app.id}`} 
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:shadow-md transition-all"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                      {apps.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                            No applications found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <div className="space-y-8 flex flex-col">
                {/* System Health Card - Cyber/Tech Look */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-900/30 p-8 text-white relative overflow-hidden group border border-slate-800"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold tracking-tight">System Health</h3>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-2"><Server className="w-3 h-3" /> Server Load</span>
                          <span className="text-emerald-400">62%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} animate={{ width: "62%" }} 
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                          ></motion.div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> API Response</span>
                          <span className="text-sky-400">157ms</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} animate={{ width: "85%" }} 
                            className="h-full bg-gradient-to-r from-sky-600 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                          ></motion.div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-2"><Database className="w-3 h-3" /> DB Health</span>
                          <span className="text-indigo-400">98%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} animate={{ width: "98%" }} 
                            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.4)]"
                          ></motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      All systems operational. Next maintenance in 3 days.
                    </div>
                  </div>
                  
                  {/* Abstract background blobs */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-600/20 rounded-full blur-[80px] group-hover:bg-brand-600/30 transition-colors duration-500"></div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] group-hover:bg-indigo-600/30 transition-colors duration-500"></div>
                </motion.div>

                {/* Quick Actions - Interactive Grid */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 p-8 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {[
                      { text: "Review Pending", count: pendingApps, icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
                      { text: "Approve Clients", count: approvedApps, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                      { text: "Verify Documents", count: 12, icon: ShieldAlert, color: "text-blue-600", bg: "bg-blue-50" },
                      { text: "Access Requests", count: 5, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" }
                    ].map((task, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-100 transition-all duration-300 group text-center gap-3"
                      >
                        <div className={`p-3 rounded-xl ${task.bg} ${task.color} group-hover:scale-110 transition-transform`}>
                          <task.icon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-slate-900 leading-none mb-1">{task.count}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-brand-600 transition-colors leading-tight">
                            {task.text.replace(' ', '\n')}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
        </div>
      </main>
    </div>
  );
}
