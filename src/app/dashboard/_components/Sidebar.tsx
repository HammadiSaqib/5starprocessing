"use client";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  CreditCard, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  MoreVertical,
  Menu,
  Handshake,
  Users,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AffiliateModal from "./AffiliateModal";

function SidebarItem({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
  isCollapsed
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  isCollapsed: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all duration-300 font-medium overflow-hidden ${
        active
          ? "bg-brand-50 text-brand-600 shadow-sm shadow-brand-100 ring-1 ring-brand-200"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
      title={isCollapsed ? label : undefined}
    >
      <span className={`p-1.5 rounded-lg transition-all duration-300 ${
        active ? "bg-brand-100 text-brand-600" : "bg-transparent text-slate-400 group-hover:text-slate-600"
      }`}>
        <Icon 
          className="w-5 h-5" 
        />
      </span>
      {!isCollapsed && (
        <>
          <span className="text-sm tracking-tight whitespace-nowrap">{label}</span>
          {badge && (
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md ${
              active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
            }`}>
              {badge}
            </span>
          )}
          {active && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-600 rounded-r-full"></span>
          )}
        </>
      )}
      {isCollapsed && badge && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white"></span>
      )}
    </button>
  );
}

export default function DashboardSidebar({
  me,
  isCollapsed,
  toggleCollapse
}: {
  me: { name?: string; email?: string; affiliate_status?: string | null } | null;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);

  const go = (path: string) => () => router.push(path);
  
  const isActive = (id: string) => {
    if (!pathname) return id === "overview";
    return (
      (id === "overview" &&
        (pathname === "/dashboard" || pathname === "/dashboard/overview")) ||
      pathname === `/dashboard/${id}`
    );
  };

  return (
    <>
    <AffiliateModal 
      isOpen={showAffiliateModal} 
      onClose={() => setShowAffiliateModal(false)}
      onSuccess={() => {
        // Optimistic update could go here, or just let the page refresh handle it eventually
        window.location.reload(); 
      }}
    />
    <div className="h-full flex flex-col bg-white border-r border-slate-100 relative shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20">
      {/* Brand Header - Modern & Clean */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-slate-50`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 leading-tight tracking-tight">
                Star Processing
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Dashboard
              </span>
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        <button 
          onClick={toggleCollapse}
          className={`p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all ${isCollapsed ? 'bg-slate-50 text-slate-600' : ''}`}
        >
           {isCollapsed ? (
             <span className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 text-white">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
             </span>
           ) : (
             <Menu className="w-5 h-5" />
           )}
        </button>
      </div>

      {/* Navigation */}
      <div className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} py-6 space-y-8 overflow-y-auto custom-scrollbar`}>
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Main Menu
            </div>
          )}
          <SidebarItem
            icon={LayoutDashboard}
            label="Overview"
            active={isActive("overview")}
            onClick={go("/dashboard")}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={FileText}
            label="Applications"
            active={isActive("applications")}
            onClick={go("/dashboard/applications")}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={CreditCard}
            label="Documents"
            active={isActive("documents")}
            onClick={go("/dashboard/documents")}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={GraduationCap}
            label="School"
            active={isActive("school")}
            onClick={go("/dashboard/school")}
            isCollapsed={isCollapsed}
          />
          
          {me?.affiliate_status === "approved" && (
            <SidebarItem
              icon={Users}
              label="Referrals"
              active={isActive("referrals")}
              onClick={go("/dashboard/referrals")}
              isCollapsed={isCollapsed}
              badge="Partner"
            />
          )}
        </div>

        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Account
            </div>
          )}
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={isActive("settings")}
            onClick={go("/dashboard/settings")}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
             icon={HelpCircle}
             label="Support"
             active={false}
             onClick={() => {}}
             isCollapsed={isCollapsed}
           />
        </div>
      </div>

      {/* Dynamic Widget Card - Clean Pro Look */}
      {!isCollapsed && (!me?.affiliate_status || me?.affiliate_status !== "approved") && (
        <div className="px-4 pb-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-xl shadow-slate-900/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl -mr-6 -mt-6 group-hover:bg-brand-500/30 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <Handshake className="w-4 h-4 text-brand-200" />
                </div>
                <h4 className="font-bold text-sm">Become An Affiliate</h4>
                {me?.affiliate_status === "pending" && (
                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 border border-amber-200 font-bold">
                    Pending
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-[11px] mb-3 leading-relaxed opacity-90">
                Unlock higher limits & faster processing.
              </p>
              {me?.affiliate_status === "pending" ? (
                <button
                  className="w-full py-2 bg-white/60 text-white rounded-lg font-bold text-[11px] cursor-not-allowed"
                  disabled
                >
                  Pending Approval
                </button>
              ) : (
                <button
                  onClick={() => setShowAffiliateModal(true)}
                  className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-[11px] hover:bg-brand-50 hover:text-brand-700 transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Profile Footer - Minimalist */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/30">
        <div className={`relative group ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 text-left'} hover:bg-white p-2 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100`}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 border-2 border-white shadow-sm flex items-center justify-center text-brand-600 font-bold text-sm">
                {me?.name ? me.name.charAt(0) : "C"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate group-hover:text-brand-600 transition-colors">
                    {me?.name || "Client"}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate font-medium">
                    {me?.email || "Loading..."}
                  </p>
                </div>
                <MoreVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
              </>
            )}
          </button>
          
          {/* Popover Menu */}
          <div className="absolute bottom-full left-0 w-full mb-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 px-1">
            <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-1.5 overflow-hidden">
               <Link
                 href="/api/auth/logout"
                 className={`flex items-center gap-2 w-full ${isCollapsed ? 'justify-center' : 'px-3'} py-2 text-xs font-medium hover:bg-red-50 rounded-lg transition-colors text-red-600`}
                 title="Sign Out"
               >
                 <LogOut className="w-3.5 h-3.5" />
                 {!isCollapsed && <span>Sign Out</span>}
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
