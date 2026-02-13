"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  Filter,
  Download,
  MoreVertical,
  CheckCircle,
  Clock,
  ShieldAlert,
  ChevronRight,
  LogOut,
  TrendingUp,
  Activity,
  Briefcase,
  Tag,
  Mail,
  Phone,
  Share,
  X,
  Copy,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

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

const SidebarItem = ({ 
  id, 
  icon: Icon, 
  label, 
  activeTab, 
  setActiveTab, 
  setSidebarOpen 
}: { 
  id: string; 
  icon: React.ElementType; 
  label: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
}) => (
  <button
    onClick={() => {
      setActiveTab(id);
      setSidebarOpen(false);
    }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      activeTab === id 
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    <Icon className={`w-5 h-5 ${activeTab === id ? "text-white" : "text-current"}`} />
    <span>{label}</span>
    {activeTab === id && (
      <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
    )}
  </button>
);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apps, setApps] = useState<AdminApp[]>([]);
  interface AdminAgent { id: number; name: string; email: string; phone?: string | null; status?: string; role?: string; referral_count?: number; created_at?: string; }
  interface AdminClient { id: number; name: string; email: string; status?: string; created_at?: string }
  const [agents, setAgents] = useState<AdminAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", password: "", phone: "", role: "team" });
  const [agentLoading, setAgentLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [selectedAgent, setSelectedAgent] = useState<AdminAgent | null>(null);
  const [agentClients, setAgentClients] = useState<AdminClient[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedAppForSupport, setSelectedAppForSupport] = useState<AdminApp | null>(null);
  const [supportNumberInput, setSupportNumberInput] = useState("");
  const [savingSupport, setSavingSupport] = useState(false);
  const [supportNumbers, setSupportNumbers] = useState<{ id: number; number: string; label?: string | null }[]>([]);
  const [newSupportNumber, setNewSupportNumber] = useState("");
  const [newSupportLabel, setNewSupportLabel] = useState("");

  const fetchAgentClients = async (agentId: number) => {
    setLoadingClients(true);
    setAgentClients([]);
    try {
        const res = await fetch(`/api/admin/agents/${agentId}/clients`);
        if (res.ok) {
            const data = await res.json();
            setAgentClients(data as AdminClient[]);
        }
    } catch (e) {
        console.error("Failed to fetch clients", e);
    } finally {
        setLoadingClients(false);
    }
  };

  const handleAgentClick = (agent: AdminAgent) => {
    setSelectedAgent(agent);
    fetchAgentClients(agent.id);
  };

  const openSupportModal = (app: AdminApp) => {
    setSelectedAppForSupport(app);
    setSupportNumberInput(app.custom_support_number || "");
    setShowSupportModal(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/support-numbers");
        if (res.ok) {
          const data = await res.json();
          setSupportNumbers(Array.isArray(data) ? data : []);
        }
      } catch {}
    })();
  }, [showSupportModal]);

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

  const loadSupportNumbersAdmin = async () => {
    try {
      const res = await fetch("/api/admin/support-numbers");
      if (res.ok) {
        const data = await res.json();
        setSupportNumbers(Array.isArray(data) ? data : []);
      }
    } catch {}
  };

  const addSupportNumber = async () => {
    const number = newSupportNumber.trim();
    const label = newSupportLabel.trim();
    if (!number) return;
    try {
      const res = await fetch("/api/admin/support-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, label }),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportNumbers(Array.isArray(data) ? data : []);
        setNewSupportNumber("");
        setNewSupportLabel("");
      }
    } catch {}
  };

  const deleteSupportNumberAdmin = async (id: number) => {
    try {
      const res = await fetch("/api/admin/support-numbers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const data = await res.json();
        setSupportNumbers(Array.isArray(data) ? data : []);
      }
    } catch {}
  };

  const shareUrl = "http://localhost:3000/admin-ref/signup";

  const shareOptions = [
    { name: "Copy Link", icon: Copy, action: () => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
    { name: "Email", icon: Mail, action: () => window.open(`mailto:?subject=Join%20Us&body=${encodeURIComponent(shareUrl)}`), color: "bg-red-50 text-red-600 hover:bg-red-100" },
    { name: "WhatsApp", icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`), color: "bg-green-50 text-green-600 hover:bg-green-100" },
    { name: "Facebook", icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`), color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { name: "Twitter", icon: Twitter, action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`), color: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
    { name: "LinkedIn", icon: Linkedin, action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`), color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/applications");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed to load data");
        else setApps(data as AdminApp[]);

        // Load agents if tab is 'agents' or initially?
        // Let's load agents too
        try {
          const agentsRes = await fetch("/api/admin/agents");
          if (agentsRes.ok) {
            const agentsData = await agentsRes.json();
            setAgents(agentsData);
          }
        } catch {}

      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Calculated Stats
  const totalApps = apps.length;
  const pendingApps = apps.filter(a => (a.status || "pending").toLowerCase() === "pending").length;
  const approvedApps = apps.filter(a => (a.status || "").toLowerCase() === "approved").length;
  const highRiskApps = apps.filter(a => (a.industry || "").toLowerCase().includes("high")).length; // Mock logic

  // Animation Variants
  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 50 }
    }
  };

  // Removed the previous internal SidebarItem definition


  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "declined") return "bg-red-100 text-red-700 border-red-200";
    if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
    if (s === "possed") return "bg-violet-100 text-violet-700 border-violet-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.tag || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAgentLoading(true);
    try {
      const res = await fetch("/api/admin/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      });
      if (res.ok) {
        const created = await res.json();
        setAgents([created, ...agents]);
        setShowAgentModal(false);
        setNewAgent({ name: "", email: "", password: "", phone: "", role: "team" });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create agent");
      }
    } catch {
      alert("Failed to create agent");
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
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

      {/* Sidebar */}
      <motion.aside 
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "open"}
        className={`fixed lg:relative inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform lg:transform-none transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-slate-900 block">Admin Portal</span>
              <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Control Center</span>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</div>
            <SidebarItem id="overview" icon={LayoutDashboard} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
            <SidebarItem id="applications" icon={FileText} label="Applications" activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
            <SidebarItem id="agents" icon={Users} label="Agent Management" activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
            <SidebarItem id="settings" icon={Settings} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Administrator</p>
                <p className="text-xs text-slate-500 truncate">admin@5star.com</p>
              </div>
            </div>
            <Link 
              href="/api/auth/logout" 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 capitalize">
              {activeTab === "overview" ? "System Overview" : activeTab}
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
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

          <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {error && (
             <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
               <ShieldAlert className="w-5 h-5" />
               <span className="font-medium">{error}</span>
             </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Hero Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: "Total Applications", value: totalApps, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Pending Review", value: pendingApps, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                      { label: "Approved Clients", value: approvedApps, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "High Risk Ind.", value: highRiskApps, icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        variants={itemVariants}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.bg} ${stat.color} flex items-center gap-1`}>
                            <TrendingUp className="w-3 h-3" /> +12%
                          </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Applications List */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Activity className="w-5 h-5 text-brand-500" />
                          Recent Submissions
                        </h3>
                        <button 
                          onClick={() => setActiveTab("applications")}
                          className="text-sm text-brand-600 font-semibold hover:text-brand-700 hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View All
                        </button>
                      </div>
                      <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold tracking-wider">
                            <tr>
                              <th className="px-6 py-4">Applicant</th>
                              <th className="px-6 py-4">Industry</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {apps.slice(0, 5).map((app) => (
                              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                                      {app.name.charAt(0)}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-slate-900">{app.name}</div>
                                      <div className="text-xs text-slate-500">{app.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                  {app.industry || <span className="text-slate-400 italic">Unspecified</span>}
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                                    {app.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button className="text-slate-400 hover:text-brand-600 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {apps.length === 0 && (
                              <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No applications found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>

                    {/* Quick Stats / Actions */}
                    <motion.div variants={itemVariants} className="space-y-6">
                      <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold mb-2">System Health</h3>
                          <div className="flex items-center gap-2 mb-6 text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-sm font-medium">All Systems Operational</span>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Server Load</span>
                                <span>24%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-brand-500 h-1.5 rounded-full w-[24%]"></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Database Capacity</span>
                                <span>68%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full w-[68%]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                      </div>

                      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Tasks</h3>
                        <div className="space-y-3">
                          {[
                            { text: "Review High Risk Apps", count: 3 },
                            { text: "Verify Documents", count: 12 },
                            { text: "User Access Requests", count: 5 }
                          ].map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                              <span className="text-slate-600 font-medium group-hover:text-slate-900">{task.text}</span>
                              <span className="bg-white text-brand-600 text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                                {task.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
 
                 </motion.div>
               )}

              {/* APPLICATIONS TAB */}
              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Application Management</h2>
                      <p className="text-slate-500 text-sm mt-1">Manage and review all incoming applications.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 font-medium transition-colors border border-slate-200">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition-colors shadow-lg shadow-slate-900/20">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowShareModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition-colors shadow-lg shadow-brand-500/20"
                        title="Share signup link"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share Signup Link</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Share Modal */}
                  <AnimatePresence>
                    {showShareModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden"
                        >
                          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Share Signup Link</h3>
                            <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="p-6 space-y-6">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                              <span className="text-sm text-slate-600 font-mono truncate">{shareUrl}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(shareUrl);
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 hover:bg-white rounded-lg transition-colors text-brand-600"
                              >
                                {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                              {shareOptions.map((option) => (
                                <button
                                  key={option.name}
                                  onClick={option.action}
                                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all ${option.color}`}
                                >
                                  <option.icon className="w-6 h-6" />
                                  <span className="text-xs font-medium">{option.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
 
                  {/* Support Number Modal */}
                  <AnimatePresence>
                    {showSupportModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden"
                        >
                          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Set Support Number</h3>
                            <button onClick={() => setShowSupportModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="p-6 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Select Support Number</label>
                              <select
                                value={supportNumberInput}
                                onChange={e => setSupportNumberInput(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
                              >
                                <option value="">Choose number...</option>
                                {supportNumbers.map(sn => (
                                  <option key={sn.id} value={sn.number}>{sn.number}{sn.label ? ` — ${sn.label}` : ""}</option>
                                ))}
                              </select>
                              <p className="text-xs text-slate-500 mt-1">Numbers are managed by the super admin.</p>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                              <button onClick={() => setShowSupportModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                                Cancel
                              </button>
                              <button 
                                onClick={saveSupportNumber}
                                disabled={savingSupport}
                                className="px-6 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
                              >
                                {savingSupport ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Applicant Details</th>
                          <th className="px-6 py-4">Business Info</th>
                          <th className="px-6 py-4">Support #</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredApps.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4 text-sm text-slate-500 font-mono">#{app.id}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{app.name}</span>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {app.email}</span>
                                  {app.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {app.phone}</span>}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Briefcase className="w-3 h-3 text-slate-400" />
                                  <span className="text-sm text-slate-700">{app.industry || "N/A"}</span>
                                </div>
                                {app.tag && (
                                  <div className="flex items-center gap-2">
                                    <Tag className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{app.tag}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                               <button 
                                 onClick={(e) => { e.stopPropagation(); openSupportModal(app); }}
                                 className={`text-xs px-2 py-1 rounded-lg border transition-colors ${app.custom_support_number ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                               >
                                  {app.custom_support_number || "Set Number"}
                               </button>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                                <div className={`w-1.5 h-1.5 rounded-full bg-current`}></div>
                                {app.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredApps.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center justify-center text-slate-400">
                                <Search className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-lg font-medium text-slate-900">No applications found</p>
                                <p className="text-sm">Try adjusting your search terms.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-sm text-slate-500">
                    <span>Showing {filteredApps.length} entries</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Previous</button>
                      <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Next</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AGENTS TAB */}
              {activeTab === "agents" && (
                <motion.div
                  key="agents"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Agent Management</h2>
                      <p className="text-slate-500 text-sm mt-1">Manage staff, admins, and agents.</p>
                    </div>
                    <button
                      onClick={() => setShowAgentModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition-colors shadow-lg shadow-brand-500/20"
                    >
                      <Users className="w-4 h-4" />
                      <span>Add Agent</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Contact</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Clients</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {agents.map((agent) => (
                          <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => handleAgentClick(agent)}>
                            <td className="px-6 py-4 font-medium text-slate-900">{agent.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              <div className="flex flex-col">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {agent.email}</span>
                                {agent.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {agent.phone}</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                agent.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {agent.status || 'Active'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                                  <Users className="w-4 h-4 text-brand-500" />
                                  {agent.referral_count || 0}
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-slate-400 hover:text-slate-600" onClick={(e) => { e.stopPropagation(); /* Add other actions here */ }}>
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {agents.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                              No agents found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Agent Modal */}
                  <AnimatePresence>
                    {showAgentModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden"
                        >
                          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900">Add New Agent</h3>
                            <button onClick={() => setShowAgentModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <form onSubmit={handleAddAgent} className="p-6 space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                              <input
                                type="text"
                                required
                                value={newAgent.name}
                                onChange={e => setNewAgent({...newAgent, name: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                              <input
                                type="email"
                                required
                                value={newAgent.email}
                                onChange={e => setNewAgent({...newAgent, email: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                placeholder="john@example.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                              <input
                                type="password"
                                required
                                value={newAgent.password}
                                onChange={e => setNewAgent({...newAgent, password: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                placeholder="••••••••"
                              />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone (Optional)</label>
                                <input
                                  type="tel"
                                  value={newAgent.phone}
                                  onChange={e => setNewAgent({...newAgent, phone: e.target.value})}
                                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                                  placeholder="+1 (555) ..."
                                />
                              </div>
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                              <button
                                type="button"
                                onClick={() => setShowAgentModal(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={agentLoading}
                                className="px-6 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
                              >
                                {agentLoading ? "Creating..." : "Create Agent"}
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Agent Details Modal */}
                  <AnimatePresence>
                    {selectedAgent && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh]"
                        >
                          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{selectedAgent.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700 uppercase tracking-wide`}>{selectedAgent.role || "Team"}</span>
                                    <span>•</span>
                                    <span>Joined {new Date(selectedAgent.created_at || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedAgent(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100 bg-white">
                             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="text-blue-600 mb-1"><Users className="w-5 h-5" /></div>
                                <div className="text-2xl font-bold text-slate-900">{selectedAgent.referral_count || 0}</div>
                                <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total Clients</div>
                             </div>
                             <div className="col-span-2 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Mail className="w-4 h-4" /></div>
                                    <span className="font-medium">{selectedAgent.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Phone className="w-4 h-4" /></div>
                                    <span className="font-medium">{selectedAgent.phone || "No phone provided"}</span>
                                </div>
                             </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-0">
                             <div className="p-4 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider sticky top-0">
                                Referred Clients ({agentClients.length})
                             </div>
                             {loadingClients ? (
                                <div className="p-8 flex justify-center">
                                    <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                                </div>
                             ) : agentClients.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead className="bg-white text-slate-500 text-xs uppercase font-semibold tracking-wider sticky top-0 shadow-sm">
                                        <tr>
                                            <th className="px-6 py-3">Client Name</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3 text-right">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {agentClients.map((client: AdminClient) => (
                                            <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-3">
                                                    <div className="font-medium text-slate-900">{client.name}</div>
                                                    <div className="text-xs text-slate-500">{client.email}</div>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client.status || "Pending")}`}>
                                                        {client.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-right text-sm text-slate-500">
                                                    {new Date(client.created_at || Date.now()).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             ) : (
                                <div className="p-12 text-center text-slate-400">
                                    <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No clients referred yet.</p>
                                </div>
                             )}
                          </div>
                          
                          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                             <button onClick={() => setSelectedAgent(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors">
                                Close Details
                             </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Support Numbers</h2>
                      <p className="text-slate-500 text-sm mt-1">Add numbers and labels for assignment by admins and agents.</p>
                    </div>
                    <button
                      onClick={loadSupportNumbersAdmin}
                      className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 font-medium transition-colors border border-slate-200"
                    >
                      Refresh
                    </button>
                  </div>
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Number</label>
                          <input
                            type="text"
                            value={newSupportNumber}
                            onChange={e => setNewSupportNumber(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                            placeholder="123456789"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                          <input
                            type="text"
                            value={newSupportLabel}
                            onChange={e => setNewSupportLabel(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                            placeholder="Sales"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={addSupportNumber}
                            className="px-6 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                            <tr>
                              <th className="px-6 py-4">Number</th>
                              <th className="px-6 py-4">Label</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {supportNumbers.map(sn => (
                              <tr key={sn.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{sn.number}</td>
                                <td className="px-6 py-4 text-slate-600">{sn.label || "-"}</td>
                                <td className="px-6 py-4 text-right">
                                  <button
                                    onClick={() => deleteSupportNumberAdmin(sn.id)}
                                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 text-sm"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {supportNumbers.length === 0 && (
                              <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-slate-400">No support numbers yet</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
