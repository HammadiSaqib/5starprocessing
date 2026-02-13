"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/team", label: "Overview", icon: LayoutDashboard },
    { href: "/team/users", label: "Users", icon: Users },
    { href: "/team/submints", label: "Submissions", icon: FileText },
    { href: "/team/school", label: "School", icon: FileText }, // Reusing FileText or I should import another icon
    { href: "/team/settings", label: "Settings", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <span className="text-white font-bold text-lg">5S</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Agent Portal</h1>
              <p className="text-xs text-slate-500 font-medium">Administration</p>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-brand-50 text-brand-700 font-semibold shadow-sm ring-1 ring-brand-200" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Link 
            href="/api/auth/logout" 
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            <span className="font-medium">Sign Out</span>
          </Link>
          <div className="mt-4 px-4 text-xs text-slate-400 text-center">
            &copy; 2025 5 Star Processing
          </div>
        </div>
      </aside>
      <section className="flex-1 h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 md:p-12">
          {children}
        </div>
      </section>
    </main>
  );
}
