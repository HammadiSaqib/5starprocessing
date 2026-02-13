"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Mail, 
  Phone, 
  MoreVertical, 
  X, 
  Menu, 
  Search, 
  Bell,
  UserPlus,
  Briefcase,
  TrendingUp,
  Activity,
  UserCheck,
  Shield
} from "lucide-react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";

interface AdminAgent { id: number; name: string; email: string; phone?: string | null; status?: string; role?: string; referral_count?: number; created_at?: string; }
interface AdminClient { id: number; name: string; email: string; status?: string; created_at?: string }

const getStatusColor = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "declined") return "bg-red-100 text-red-700 border-red-200";
  if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
  if (s === "possed") return "bg-violet-100 text-violet-700 border-violet-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
};

export default function AgentManagementPage() {
  const [agents, setAgents] = useState<AdminAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const [showAgentModal, setShowAgentModal] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", password: "", phone: "", role: "team" });
  const [agentLoading, setAgentLoading] = useState(false);

  const [selectedAgent, setSelectedAgent] = useState<AdminAgent | null>(null);
  const [agentClients, setAgentClients] = useState<AdminClient[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/agents");
        if (res.ok) {
          const data = await res.json();
          setAgents(data as AdminAgent[]);
        } else {
          const data = await res.json();
          setError(data.error || "Failed to load agents");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchAgentClients = async (agentId: number) => {
    setLoadingClients(true);
    setAgentClients([]);
    try {
      const res = await fetch(`/api/admin/agents/${agentId}/clients`);
      if (res.ok) {
        const data = await res.json();
        setAgentClients(data as AdminClient[]);
      }
    } catch {} finally {
      setLoadingClients(false);
    }
  };

  const handleAgentClick = (agent: AdminAgent) => {
    setSelectedAgent(agent);
    fetchAgentClients(agent.id);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50 } }
  };

  // Calculate stats
  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => !a.status || a.status.toLowerCase() === 'active').length; // Assuming default is active if null
  const totalClients = agents.reduce((sum, agent) => sum + (agent.referral_count || 0), 0);
  const teamRoles = agents.filter(a => a.role === 'team').length;

  const stats = [
    { 
      label: "Total Agents", 
      value: totalAgents, 
      icon: Users, 
      color: "text-brand-600", 
      bg: "bg-brand-100", 
      bgGradient: "from-brand-50 to-white",
      trend: "+4 this month",
      trendColor: "text-brand-600"
    },
    { 
      label: "Active Status", 
      value: activeAgents, 
      icon: Activity, 
      color: "text-emerald-600", 
      bg: "bg-emerald-100", 
      bgGradient: "from-emerald-50 to-white",
      trend: "98% uptime",
      trendColor: "text-emerald-600"
    },
    { 
      label: "Total Clients", 
      value: totalClients, 
      icon: Briefcase, 
      color: "text-blue-600", 
      bg: "bg-blue-100", 
      bgGradient: "from-blue-50 to-white",
      trend: "+12%",
      trendColor: "text-emerald-600"
    },
    { 
      label: "Team Members", 
      value: teamRoles, 
      icon: Shield, 
      color: "text-violet-600", 
      bg: "bg-violet-100", 
      bgGradient: "from-violet-50 to-white",
      trend: "Stable",
      trendColor: "text-slate-500"
    },
  ];

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              {pathname?.split("/").slice(2).join(" ") || "Agent Management"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Search agents..."
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

              {/* Agents Table */}
              <motion.div variants={itemVariants} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Agent Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage staff, admins, and agents access.</p>
                  </div>
                  <button
                    onClick={() => setShowAgentModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-bold transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:-translate-y-0.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Agent</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Agent Profile</th>
                        <th className="px-6 py-4">Contact Info</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Performance</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAgents.map((agent) => (
                        <tr 
                          key={agent.id} 
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          onClick={() => handleAgentClick(agent)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-100 transition-colors">
                                {agent.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{agent.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{agent.role || "Agent"}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 text-sm text-slate-500">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                <span>{agent.email}</span>
                              </div>
                              {agent.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{agent.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${agent.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                              {agent.status || "Active"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{agent.referral_count || 0}</p>
                                <p className="text-[10px] uppercase font-semibold text-slate-400">Clients</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAgents.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            <p>No agents found.</p>
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

      {/* Add Agent Modal */}
      <AnimatePresence>
        {showAgentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAgentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add New Agent</h3>
                <button onClick={() => setShowAgentModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddAgent} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAgent.name}
                      onChange={e => setNewAgent({...newAgent, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={newAgent.phone}
                      onChange={e => setNewAgent({...newAgent, phone: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newAgent.email}
                    onChange={e => setNewAgent({...newAgent, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={newAgent.password}
                    onChange={e => setNewAgent({...newAgent, password: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                  <select
                    value={newAgent.role}
                    onChange={e => setNewAgent({...newAgent, role: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
                  >
                    <option value="team">Team Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={agentLoading}
                    className="w-full py-3.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {agentLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Agent...
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Create Agent
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Client Details Modal (when agent clicked) */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAgent(null)}
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
                  <h3 className="text-2xl font-bold text-slate-900">{selectedAgent.name}</h3>
                  <p className="text-slate-500 mt-1">Client List & Performance</p>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loadingClients ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <p className="text-2xl font-black text-slate-900">{agentClients.length}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Clients</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                      <p className="text-2xl font-black text-emerald-600">
                        {agentClients.filter(c => (c.status || "").toLowerCase() === "approved").length}
                      </p>
                      <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-wide">Approved</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                      <p className="text-2xl font-black text-amber-600">
                        {agentClients.filter(c => (c.status || "").toLowerCase() === "pending").length}
                      </p>
                      <p className="text-xs font-bold text-amber-600/70 uppercase tracking-wide">Pending</p>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-500" />
                    Client History
                  </h4>
                  
                  <div className="space-y-3">
                    {agentClients.map(client => (
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
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(client.status || "")}`}>
                          {client.status || "Pending"}
                        </span>
                      </div>
                    ))}
                    {agentClients.length === 0 && (
                      <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        No clients found for this agent.
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
