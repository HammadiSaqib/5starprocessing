 "use client";
 
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import { LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react";
 
 export default function AdminSidebar({ sidebarOpen }: { sidebarOpen: boolean }) {
   const pathname = usePathname();
   const nav = [
     { href: "/admin/overview", label: "Dashboard", icon: LayoutDashboard },
     { href: "/admin/applications", label: "Applications", icon: FileText },
     { href: "/admin/agent-management", label: "Agent Management", icon: Users },
     { href: "/admin/settings", label: "Settings", icon: Settings },
   ];
   const isActive = (href: string) => pathname?.startsWith(href);
 
   return (
     <aside
       className={`fixed lg:relative inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform lg:transform-none transition-transform duration-300 ease-in-out ${
         sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
       }`}
     >
       <div className="h-full flex flex-col p-6">
         <div className="flex items-center gap-3 px-2 mb-10">
           <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 block">Admin Portal</span>
            <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Control Center</span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Menu</div>
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive(href)
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(href) ? "text-white" : "text-current"}`} />
              <span>{label}</span>
              {isActive(href) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </Link>
          ))}
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
     </aside>
   );
 }
