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
          ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
      title={isCollapsed ? label : undefined}
    >
      <span className={`transition-all duration-300 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}>
        <Icon className="w-5 h-5" />
      </span>
      {!isCollapsed && (
        <>
          <span className="text-sm tracking-tight whitespace-nowrap">{label}</span>
          {badge && (
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md ${
              active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
            }`}>
              {badge}
            </span>
          )}
          {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
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
    <div
      className="h-full flex flex-col"
    >
      <div className="h-full flex flex-col p-6">
        {/* Brand Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-2 mb-10`}>
          {!isCollapsed ? (
            <>
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                <span className="text-white font-bold text-xl">5★</span>
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-slate-900 block">Star Processing</span>
                <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Client Portal</span>
              </div>
            </>
          ) : (
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              <span className="text-white font-bold text-xl">5★</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button 
          onClick={toggleCollapse}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
        >
           <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {!isCollapsed && (
            <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</div>
          )}
          
          <Link
            href="/dashboard"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive("overview")
                ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "Overview" : undefined}
          >
            <LayoutDashboard className={`w-5 h-5 ${isActive("overview") ? "text-white" : "text-current"}`} />
            {!isCollapsed && <span>Overview</span>}
            {!isCollapsed && isActive("overview") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
          </Link>

          <Link
            href="/dashboard/applications"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive("applications")
                ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "Applications" : undefined}
          >
            <FileText className={`w-5 h-5 ${isActive("applications") ? "text-white" : "text-current"}`} />
            {!isCollapsed && <span>Applications</span>}
            {!isCollapsed && isActive("applications") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
          </Link>

          <Link
            href="/dashboard/documents"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive("documents")
                ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "Documents" : undefined}
          >
            <CreditCard className={`w-5 h-5 ${isActive("documents") ? "text-white" : "text-current"}`} />
            {!isCollapsed && <span>Documents</span>}
            {!isCollapsed && isActive("documents") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
          </Link>

          <Link
            href="/dashboard/school"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              isActive("school")
                ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            } ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "School" : undefined}
          >
            <GraduationCap className={`w-5 h-5 ${isActive("school") ? "text-white" : "text-current"}`} />
            {!isCollapsed && <span>School</span>}
            {!isCollapsed && isActive("school") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
          </Link>

          {me?.affiliate_status === "approved" && (
            <Link
              href="/dashboard/referrals"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive("referrals")
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={isCollapsed ? "Referrals" : undefined}
            >
              <Users className={`w-5 h-5 ${isActive("referrals") ? "text-white" : "text-current"}`} />
              {!isCollapsed && <span>Referrals</span>}
              {!isCollapsed && isActive("referrals") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          )}

          <div className="mt-auto">
            {!isCollapsed && (
              <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">Account</div>
            )}

            <Link
              href="/dashboard/settings"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive("settings")
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              } ${isCollapsed ? 'justify-center px-2' : ''}`}
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings className={`w-5 h-5 ${isActive("settings") ? "text-white" : "text-current"}`} />
              {!isCollapsed && <span>Settings</span>}
              {!isCollapsed && isActive("settings") && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          </div>
        </div>

        {/* Dynamic Widget Card */}
        {!isCollapsed && (!me?.affiliate_status || me?.affiliate_status !== "approved") && (
          <div className="mb-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-xl shadow-slate-900/10">
              <div className="flex items-center gap-2 mb-2">
                <Handshake className="w-4 h-4 text-brand-200" />
                <h4 className="font-bold text-xs">Become Affiliate</h4>
              </div>
              {me?.affiliate_status === "pending" ? (
                <button
                  className="w-full py-1.5 bg-white/20 text-white/60 rounded-lg font-bold text-[10px] cursor-not-allowed border border-white/10"
                  disabled
                >
                  Pending Approval
                </button>
              ) : (
                <button
                  onClick={() => setShowAffiliateModal(true)}
                  className="w-full py-1.5 bg-brand-600 text-white rounded-lg font-bold text-[10px] hover:bg-brand-500 transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-6">
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                {me?.name ? me.name.charAt(0) : "C"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{me?.name || "Client"}</p>
                <p className="text-xs text-slate-500 truncate">{me?.email || "Loading..."}</p>
              </div>
            </div>
          )}
          <Link
            href="/api/auth/logout"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
