"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, User, Clock, CheckCircle, Activity, UploadCloud, HelpCircle, Phone, Bell, FileText } from "lucide-react";

// Page-specific content; shared dashboard shell is in layout.tsx

export default function DashboardPage() {
  const [me, setMe] = useState<{ status?: string; status_reason?: string; name?: string; email?: string; custom_support_number?: string | null } | null>(null);
  const [appInfo, setAppInfo] = useState<{ status?: string; merchantId?: string | null; trackingId?: string | null } | null>(null);
  const router = useRouter();

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
            email: data.email || "client@example.com",
            custom_support_number: data.custom_support_number
          });
        }
      } catch (e) {
        console.error("Failed to fetch user status", e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/application");
        const data = await res.json();
        if (res.ok) {
          setAppInfo({ status: data.status, merchantId: data.merchantId, trackingId: data.trackingId });
        }
      } catch {}
    })();
  }, []);

  // const pending = me?.status === "Pending";
  // const possed = me?.status === "Possed";

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

  if (me?.custom_support_number) {
    stats.push({
      label: "Dedicated Support",
      value: me.custom_support_number,
      icon: Phone,
      color: "text-blue-600",
      bg: "bg-blue-50"
    });
  }



  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
          
            {/* OVERVIEW */}
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
                      <button onClick={() => { router.push("/dashboard/applications"); }} className="px-6 py-3 bg-white !text-red-600 hover:text-red-700 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
                        <Activity className="w-5 h-5" color="#dc2626" />
                        Submit Quick App
                      </button>
                      {appInfo?.status === "approved" && (
                        <div className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20 backdrop-blur-sm flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-300" />
                            <span>Approved</span>
                          </div>
                          {appInfo.merchantId && (
                            <span className="inline-flex items-center px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs">
                              MID: {appInfo.merchantId}
                            </span>
                          )}
                          {appInfo.trackingId && (
                            <span className="inline-flex items-center px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-xs">
                              Tracking: {appInfo.trackingId}
                            </span>
                          )}
                        </div>
                      )}
                      {me?.custom_support_number ? (
                        <a
                          href={`tel:${me.custom_support_number}`}
                          className="px-6 py-3 bg-brand-700/50 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors border border-white/10 backdrop-blur-sm flex items-center gap-2"
                          title="Call your assigned support number"
                        >
                          <Phone className="w-5 h-5" />
                          {me.custom_support_number}
                        </a>
                      ) : (
                        <button onClick={() => { router.push("/dashboard/applications"); }} className="px-6 py-3 bg-brand-700/50 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors border border-white/10 backdrop-blur-sm">
                          Submit Application
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${stats.length > 3 ? '4' : '3'} gap-6`}>
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
                        {i < 3 && (
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                            +2.5%
                          </span>
                        )}
                      </div>
                      <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                      <p className={`font-bold text-slate-900 ${String(stat.value).length > 15 ? 'text-lg' : 'text-2xl'}`}>{stat.value}</p>
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
                        <p className="text-slate-300 text-sm mb-6">
                          {me?.custom_support_number 
                            ? "Your dedicated support agent is available to help you with any issues." 
                            : "Our support team is available 24/7 to help you with any issues."}
                        </p>
                        {me?.custom_support_number ? (
                          <div className="space-y-3 text-slate-800">
                            <a href={`tel:${me.custom_support_number}`} className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-300 rounded-xl font-bold hover:bg-brand-50 transition-colors text-sm">
                              <Phone className="w-4 h-4" />
                              {me.custom_support_number}
                            </a>
                            <button className="w-full py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 transition-colors text-sm border border-slate-600">
                              Contact via Email
                            </button>
                          </div>
                        ) : (
                          <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-brand-50 transition-colors text-sm">
                            Contact Support
                          </button>
                        )}
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>

            {/* SETTINGS TAB */}
            {false && (
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

            {/* APPLICATIONS TAB */}
            {/* applications content moved to /dashboard/applications/page.tsx */}

            {/* DOCUMENTS content moved to /dashboard/documents/page.tsx */}
        </div>
  );
}
