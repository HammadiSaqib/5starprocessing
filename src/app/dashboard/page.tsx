"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  FileText,
  CreditCard,
  Bell,
  Search,
  Menu,
  ChevronRight,
  User,
  LogOut,
  ShieldAlert,
  Clock,
  CheckCircle,
  Activity,
  UploadCloud,
  HelpCircle,
  Mail,
  Shield,
} from "lucide-react";

const SidebarItem = ({ 
  id, 
  icon: Icon, 
  label, 
  activeTab, 
  onClick 
}: { 
  id: string; 
  icon: React.ElementType; 
  label: string; 
  activeTab: string; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      activeTab === id 
        ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20" 
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [me, setMe] = useState<{ status?: string; status_reason?: string; name?: string; email?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (res.ok) {
          setMe({ 
            status: data.status, 
            status_reason: data.status_reason,
            name: data.name || "Valued Client",
            email: data.email || "client@example.com"
          });
        }
      } catch (e) {
        console.error("Failed to fetch user status", e);
      }
    })();
  }, []);

  const pending = me?.status === "Pending";
  const possed = me?.status === "Possed";

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

  // Mock Data
  const recentActivities = [
    { id: 1, title: "Application Submitted", date: "Today, 10:23 AM", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, title: "Document Verified", date: "Yesterday, 2:45 PM", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 3, title: "Profile Updated", date: "Jan 22, 2026", icon: User, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  const stats = [
    { label: "Application Status", value: me?.status || "In Review", icon: Activity, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Documents Uploaded", value: "4/5", icon: UploadCloud, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Actions", value: "1", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  ];



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
        animate={sidebarOpen ? "open" : "open"} // Always open on desktop via CSS, controlled on mobile
        className={`fixed lg:relative inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform lg:transform-none transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
              <span className="text-white font-bold text-xl">5</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Star Processing</span>
          </div>

          <div className="space-y-2 flex-1">
            <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</div>
            <SidebarItem 
              id="overview" 
              icon={LayoutDashboard} 
              label="Overview" 
              activeTab={activeTab} 
              onClick={() => setActiveTab("overview")} 
            />
            <SidebarItem 
              id="applications" 
              icon={FileText} 
              label="Applications" 
              activeTab={activeTab} 
              onClick={() => setActiveTab("applications")} 
            />
            <SidebarItem 
              id="documents" 
              icon={CreditCard} 
              label="Documents" 
              activeTab={activeTab} 
              onClick={() => setActiveTab("documents")} 
            />
            <SidebarItem 
              id="settings" 
              icon={Settings} 
              label="Settings" 
              activeTab={activeTab} 
              onClick={() => setActiveTab("settings")} 
            />
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm">
                {me?.name ? me.name.charAt(0) : "C"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{me?.name || "Client"}</p>
                <p className="text-xs text-slate-500 truncate">{me?.email || "Loading..."}</p>
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
              {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
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
                {/* Welcome Section */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 md:p-12 text-white shadow-xl shadow-brand-600/20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
                  
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {me?.name?.split(' ')[0] || "Client"}!</h2>
                    <p className="text-brand-100 text-lg mb-8 leading-relaxed">
                      Your application is currently being processed. We&apos;ve updated your dashboard with the latest status and pending actions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-white text-brand-700 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        View Status
                      </button>
                      <button className="px-6 py-3 bg-brand-700/50 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors border border-white/10 backdrop-blur-sm">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                          +2.5%
                        </span>
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Recent Activity */}
                  <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                      <button className="text-sm text-brand-600 font-semibold hover:text-brand-700">View All</button>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex gap-4 group">
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-xl ${activity.bg} ${activity.color} flex items-center justify-center shrink-0 z-10 relative group-hover:scale-110 transition-transform`}>
                                <activity.icon className="w-6 h-6" />
                              </div>
                              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-100 -z-10 last:hidden"></div>
                            </div>
                            <div className="pb-6 border-b border-slate-50 last:border-0 last:pb-0 w-full">
                              <h4 className="text-base font-bold text-slate-900 mb-1">{activity.title}</h4>
                              <p className="text-sm text-slate-500">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-slate-700">Upload Document</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <User className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-slate-700">Update Profile</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-slate-700">Get Help</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">Need Assistance?</h3>
                        <p className="text-slate-300 text-sm mb-6">Our support team is available 24/7 to help you with any issues.</p>
                        <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-brand-50 transition-colors text-sm">
                          Contact Support
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl"
              >
                <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
                    <p className="text-slate-500 mt-1">Manage your profile and preferences</p>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {/* Profile Section */}
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-brand-600" />
                        Profile Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            defaultValue={me?.name || ""} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            defaultValue={me?.email || ""} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Bio / Description</label>
                          <textarea 
                            rows={4}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all resize-none"
                            placeholder="Tell us about your business..."
                          ></textarea>
                        </div>
                      </div>
                    </section>

                    <div className="h-px bg-slate-100"></div>

                    {/* Notifications */}
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-brand-600" />
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        {[
                          "Email me about account activity",
                          "Email me about new features",
                          "Email me about tips and newsletters"
                        ].map((label, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                            <span className="text-slate-700 font-medium">{label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked={i === 0} className="sr-only peer" />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="flex justify-end pt-4">
                      <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* APPLICATIONS TAB (Placeholder) */}
            {activeTab === "applications" && (
              <motion.div
                key="applications"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-brand-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">No Active Applications</h2>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">You haven&apos;t submitted any applications yet. Start a new application to get approved for our services.</p>
                  <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
                    Start New Application
                  </button>
                </div>
              </motion.div>
            )}

            {/* DOCUMENTS TAB (Placeholder) */}
            {activeTab === "documents" && (
              <motion.div
                key="documents"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-brand-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Documents Repository</h2>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">Securely upload and manage your business documents here. All files are encrypted.</p>
                  <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
                    Upload Document
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* GATING OVERLAYS */}
      {/* Pending Overlay */}
      <AnimatePresence>
        {pending && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
              <div className="px-8 pt-10 pb-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 shadow-inner ring-8 ring-amber-50/50">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Locked</h2>
                  <p className="text-slate-500 text-lg">Your account is currently under review.</p>
                </div>
                
                <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-amber-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-amber-900 mb-1">Status: Pending</h3>
                      <p className="text-amber-800/80 text-sm leading-relaxed">
                        We are currently reviewing your submitted documents. This process usually takes 24-48 hours. You will be notified via email once approved.
                      </p>
                      {me?.status_reason && (
                        <div className="mt-3 pt-3 border-t border-amber-200 text-sm font-medium text-amber-900">
                          Note: {me.status_reason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-full w-1/3 bg-amber-500 animate-[shimmer_2s_infinite] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/30 skew-x-12"></div>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-3 font-medium uppercase tracking-wider">Verification in progress</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Possed (Paused) Overlay */}
        {possed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-white/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              <div className="px-8 pt-10 pb-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-violet-50 text-violet-600 flex items-center justify-center mb-6 shadow-inner ring-8 ring-violet-50/50">
                    <ShieldAlert className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Access Paused</h2>
                  <p className="text-slate-500 text-lg">Your dashboard access has been temporarily suspended.</p>
                </div>
                
                <div className="bg-violet-50 rounded-2xl p-6 mb-8 border border-violet-100">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-violet-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-violet-900 mb-1">Status: Possed</h3>
                      <p className="text-violet-800/80 text-sm leading-relaxed">
                        Please contact our support team to resolve any outstanding issues and restore full access to your account.
                      </p>
                      {me?.status_reason && (
                        <div className="mt-3 pt-3 border-t border-violet-200 text-sm font-medium text-violet-900">
                          Reason: {me.status_reason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Support Team
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
