"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  User, 
  Clock, 
  CheckCircle, 
  Activity, 
  UploadCloud, 
  HelpCircle, 
  Phone,
  ArrowUpRight,
  AlertCircle,
  FileText,
  CreditCard,
  Shield,
  Zap,
  MoreHorizontal
} from "lucide-react";

export default function OverviewPage() {
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
      } catch {}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 40, damping: 15 } },
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const recentActivities = [
    { id: 1, title: "Application Submitted", date: "Today, 10:23 AM", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: "Identity Verified", date: "Yesterday, 2:45 PM", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: 3, title: "Profile Updated", date: "Jan 22, 2026", icon: User, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const stats = [
    { label: "Application Status", value: me?.status || "In Review", icon: Activity, color: "text-brand-600", bg: "bg-brand-50", trend: "Processing", trendColor: "text-brand-600" },
    { label: "Documents", value: "4/5", icon: UploadCloud, color: "text-blue-600", bg: "bg-blue-50", trend: "Action Needed", trendColor: "text-amber-600" },
    { label: "Estimated Completion", value: "24h", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: "On Track", trendColor: "text-emerald-600" },
  ];

  if (me?.custom_support_number) {
    stats.push({
      label: "Support Agent",
      value: "Assigned",
      icon: Phone,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: "Online",
      trendColor: "text-emerald-600"
    });
  }

  return (
    <motion.div
      key="overview"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-[1600px] mx-auto pb-10"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {getTimeGreeting()}, {me?.name?.split(" ")[0] || "Client"}
            <span className="inline-block animate-wave text-3xl">👋</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Here&apos;s your daily performance overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-600">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             System Operational
          </div>
          <button className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-sm transition-colors text-slate-600">
            <Clock className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Grid Layout - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Hero Status Card (Span 8) */}
        <motion.div variants={itemVariants} className="md:col-span-8 relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-10 flex flex-col justify-between min-h-[300px] group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-brand-50 to-orange-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-900/20">
                Primary Status
              </span>
              {appInfo?.status === 'approved' && (
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" /> Approved
                </div>
              )}
            </div>

            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                {appInfo?.status === 'approved' ? 'Ready to Process' : 'Application in Progress'}
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                {appInfo?.status === 'approved' 
                  ? "Congratulations! Your merchant account is approved and ready for transactions." 
                  : me?.status_reason || "We are currently reviewing your submitted documentation. Our team is working to finalize your approval."}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => router.push("/dashboard/applications")}
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-brand-600/20 hover:-translate-y-1 flex items-center gap-2"
                >
                  View Application
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                {me?.custom_support_number && (
                   <a
                    href={`tel:${me.custom_support_number}`}
                    className="px-8 py-4 bg-white border-2 border-slate-100 hover:border-brand-200 text-slate-700 hover:text-brand-600 rounded-2xl font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Support
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-6 right-6 hidden md:block opacity-10 group-hover:opacity-20 transition-opacity duration-500">
             <Activity className="w-48 h-48 text-brand-600" />
          </div>
        </motion.div>

        {/* Quick Actions & Promo (Span 4) */}
        <div className="md:col-span-4 flex flex-col gap-6">
           {/* Go Premium Card */}
           <motion.div variants={itemVariants} className="flex-1 relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl shadow-slate-900/20 group cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                     <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Upgrade Plan</h3>
                   <p className="text-slate-400 font-medium text-sm leading-relaxed">
                     Get lower rates and 24/7 priority support.
                   </p>
                </div>
                <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors">
                  View Plans
                </button>
              </div>
           </motion.div>

           {/* Quick Upload */}
           <motion.div variants={itemVariants} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/dashboard/documents")}>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Upload Docs</h4>
                    <p className="text-xs font-semibold text-slate-400">Drag & drop support</p>
                 </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                 <ChevronRight className="w-5 h-5" />
              </div>
           </motion.div>
        </div>

        {/* Stats Row (Span 12) */}
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="md:col-span-3 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 group"
          >
             <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <MoreHorizontal className="w-5 h-5 text-slate-300 cursor-pointer hover:text-slate-500" />
             </div>
             <div>
                <p className="text-slate-500 text-sm font-bold mb-1">{stat.label}</p>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{stat.value}</h4>
                <div className="flex items-center gap-2">
                   <span className={`text-xs font-bold ${stat.trendColor} bg-slate-50 px-2 py-1 rounded-md`}>
                      {stat.trend}
                   </span>
                </div>
             </div>
          </motion.div>
        ))}

        {/* Recent Activity Timeline (Span 8) */}
        <motion.div variants={itemVariants} className="md:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                 <p className="text-sm font-medium text-slate-500">Track your application progress</p>
              </div>
              <button className="text-sm font-bold text-brand-600 bg-brand-50 px-4 py-2 rounded-xl hover:bg-brand-100 transition-colors">
                 View All
              </button>
           </div>

           <div className="relative pl-4 space-y-8">
              <div className="absolute left-[27px] top-3 bottom-3 w-0.5 bg-slate-100 rounded-full"></div>
              {recentActivities.map((item, idx) => (
                 <div key={item.id} className="relative z-10 flex items-start gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl border-4 border-white shadow-sm flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div className="pt-3 flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                          <span className="text-xs font-bold text-slate-400">{item.date}</span>
                       </div>
                       <p className="text-sm font-medium text-slate-500">System automatically updated your status based on provided information.</p>
                    </div>
                 </div>
              ))}
           </div>
        </motion.div>

        {/* Support Card (Span 4) */}
        <motion.div variants={itemVariants} className="md:col-span-4 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] shadow-xl shadow-indigo-500/20 p-8 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
           
           <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10">
                 <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-8">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              
              <div className="space-y-3">
                 <button className="w-full py-3.5 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg">
                    Start Live Chat
                 </button>
                 <button className="w-full py-3.5 bg-indigo-700/50 text-white border border-indigo-500/30 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                    Read FAQs
                 </button>
              </div>
           </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
