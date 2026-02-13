"use client";

import { useEffect, useState } from "react";
import { 
  Menu, 
  Search, 
  Bell, 
  Palette, 
  Save, 
  RotateCcw, 
  Phone, 
  Plus, 
  Trash2,
  Check,
  Settings,
  Monitor
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";

// Default Brand Palette (Red)
const defaultPalette = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
};

const themes = [
  {
    name: "Brand Red",
    colors: defaultPalette,
    primary: "#ef4444"
  },
  {
    name: "Ocean Blue",
    colors: {
      50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
      500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554"
    },
    primary: "#3b82f6"
  },
  {
    name: "Emerald Green",
    colors: {
      50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399",
      500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22"
    },
    primary: "#10b981"
  },
  {
    name: "Royal Violet",
    colors: {
      50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa",
      500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065"
    },
    primary: "#8b5cf6"
  },
  {
    name: "Teal",
    colors: {
      50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf",
      500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a", 950: "#042f2e"
    },
    primary: "#14b8a6"
  },
  {
    name: "Indigo",
    colors: {
      50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8",
      500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b"
    },
    primary: "#6366f1"
  },
  {
    name: "Cyan",
    colors: {
      50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee",
      500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344"
    },
    primary: "#06b6d4"
  },
  {
    name: "Fuchsia",
    colors: {
      50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9",
      500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75", 950: "#4a044e"
    },
    primary: "#d946ef"
  },
  {
    name: "Lime",
    colors: {
      50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635",
      500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314", 950: "#1a2e05"
    },
    primary: "#84cc16"
  },
  {
    name: "Orange",
    colors: {
      50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c",
      500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12", 950: "#431407"
    },
    primary: "#f97316"
  },
  {
    name: "Rose",
    colors: {
      50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185",
      500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337", 950: "#4c0519"
    },
    primary: "#f43f5e"
  },
  {
    name: "Slate",
    colors: {
      50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8",
      500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a", 950: "#020617"
    },
    primary: "#64748b"
  },
  {
    name: "Sky",
    colors: {
      50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8",
      500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49"
    },
    primary: "#0ea5e9"
  },
  {
    name: "Pink",
    colors: {
      50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6",
      500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843", 950: "#500724"
    },
    primary: "#ec4899"
  },
  {
    name: "Purple",
    colors: {
      50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc",
      500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764"
    },
    primary: "#a855f7"
  },
  {
    name: "Yellow",
    colors: {
      50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15",
      500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12", 950: "#422006"
    },
    primary: "#eab308"
  },
  {
    name: "Green",
    colors: {
      50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
      500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16"
    },
    primary: "#22c55e"
  },
  {
    name: "Zinc",
    colors: {
      50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa",
      500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b"
    },
    primary: "#71717a"
  },
  {
    name: "Neutral",
    colors: {
      50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3",
      500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717", 950: "#0a0a0a"
    },
    primary: "#737373"
  },
  {
    name: "Stone",
    colors: {
      50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e",
      500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09"
    },
    primary: "#78716c"
  },
  {
    name: "Midnight",
    colors: {
      50: "#f2f8ff", 100: "#e1effe", 200: "#c6e1fe", 300: "#9ec9fd", 400: "#6aa6fa",
      500: "#4280f5", 600: "#2660e8", 700: "#1b4bd1", 800: "#183da8", 900: "#183685", 950: "#112251"
    },
    primary: "#1b4bd1"
  },
  {
    name: "Forest",
    colors: {
      50: "#f0fdf9", 100: "#ccfbf0", 200: "#99f6df", 300: "#5eeacb", 400: "#2dd4b4",
      500: "#14b89c", 600: "#0d947e", 700: "#0f7666", 800: "#115e53", 900: "#134e46", 950: "#042f2b"
    },
    primary: "#0f7666"
  },
  {
    name: "Chocolate",
    colors: {
      50: "#fdf8f6", 100: "#f2e8e5", 200: "#eaddd7", 300: "#e0cec7", 400: "#d2bab0",
      500: "#a1887f", 600: "#8d6e63", 700: "#795548", 800: "#6d4c41", 900: "#5d4037", 950: "#3e2723"
    },
    primary: "#795548"
  },
  {
    name: "Crimson",
    colors: {
      50: "#fff0f2", 100: "#ffdee3", 200: "#ffc1cb", 300: "#ff94a5", 400: "#ff5773",
      500: "#f42548", 600: "#de1235", 700: "#bb0c2b", 800: "#9b0e27", 900: "#831127", 950: "#4a0412"
    },
    primary: "#de1235"
  }
];

export default function AdminSettingsPage() {
  const [supportNumbers, setSupportNumbers] = useState<{ id: number; number: string; label?: string | null }[]>([]);
  const [newSupportNumber, setNewSupportNumber] = useState("");
  const [newSupportLabel, setNewSupportLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  const [showAllPresets, setShowAllPresets] = useState(false);
  const visiblePresets = showAllPresets ? themes : themes.slice(0, 10);
  // Theme State
  const [currentTheme, setCurrentTheme] = useState(defaultPalette);
  const [activeThemeName, setActiveThemeName] = useState("Brand Red");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    (async () => {
      try {
        const res = await fetch("/api/theme");
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === "object") {
            setCurrentTheme(data);
            const match = themes.find(t => JSON.stringify(t.colors) === JSON.stringify(data));
            if (match) setActiveThemeName(match.name);
            else setActiveThemeName("Custom");
            applyTheme(data);
            localStorage.setItem("admin-theme", JSON.stringify(data));
            return;
          }
        }
      } catch {}
      const savedTheme = localStorage.getItem("admin-theme");
      if (savedTheme) {
        try {
          const parsed = JSON.parse(savedTheme);
          setCurrentTheme(parsed);
          const match = themes.find(t => JSON.stringify(t.colors) === JSON.stringify(parsed));
          if (match) setActiveThemeName(match.name);
          else setActiveThemeName("Custom");
          applyTheme(parsed);
        } catch {}
      }
    })();
  }, []);

  const applyTheme = (colors: typeof defaultPalette) => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--db-brand-${key}`, value);
    });
  };

  const handleThemeChange = async (theme: typeof themes[0]) => {
    setCurrentTheme(theme.colors);
    setActiveThemeName(theme.name);
    applyTheme(theme.colors);
    localStorage.setItem("admin-theme", JSON.stringify(theme.colors));
    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme.colors),
      });
    } catch {}
  };

  const handleColorEdit = async (key: string, value: string) => {
    const newTheme = { ...currentTheme, [key]: value };
    setCurrentTheme(newTheme);
    setActiveThemeName("Custom");
    applyTheme(newTheme);
    localStorage.setItem("admin-theme", JSON.stringify(newTheme));
    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTheme),
      });
    } catch {}
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/support-numbers");
        if (res.ok) {
          const data = await res.json();
          setSupportNumbers(Array.isArray(data) ? data : []);
        } else {
          const data = await res.json();
          setError(data.error || "Failed to load support numbers");
        }
      } catch {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const refresh = async () => {
    try {
      const res = await fetch("/api/admin/support-numbers");
      if (res.ok) {
        const data = await res.json();
        setSupportNumbers(Array.isArray(data) ? data : []);
      }
    } catch {}
  };

  const add = async () => {
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

  const del = async (id: number) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50 } }
  };

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
              {pathname?.split("/").slice(2).join(" ") || "Settings"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Search settings..."
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

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Theme Customization Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-100 text-brand-600 rounded-xl">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Theme Customization</h2>
                    <p className="text-slate-500 text-sm">Manage global application colors and branding.</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleThemeChange(themes[0])}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition-colors border border-slate-200 shadow-sm text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Default
                </button>
              </div>
              
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-bold text-slate-900">Color Presets</label>
                    <button 
                      onClick={() => setShowAllPresets(!showAllPresets)}
                      className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      {showAllPresets ? "Show Less" : "Show More"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {visiblePresets.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => handleThemeChange(theme)}
                        className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${activeThemeName === theme.name ? 'border-brand-500 bg-brand-50/30' : 'border-slate-100 bg-white hover:border-brand-200'}`}
                      >
                        <div className="w-12 h-12 rounded-full shadow-sm" style={{ backgroundColor: theme.primary }}></div>
                        <span className={`text-sm font-semibold ${activeThemeName === theme.name ? 'text-brand-700' : 'text-slate-600'}`}>{theme.name}</span>
                        {activeThemeName === theme.name && (
                          <div className="absolute top-3 right-3 text-brand-500">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-4">Palette Editor (Advanced)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
                    {Object.entries(currentTheme).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-2">
                        <div 
                          className="h-12 w-full rounded-lg shadow-sm border border-slate-100 relative group overflow-hidden"
                          style={{ backgroundColor: value }}
                        >
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => handleColorEdit(key, e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-slate-700">{key}</p>
                          <p className="text-[10px] text-slate-400 font-mono uppercase">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support Numbers Section */}
            <motion.div variants={itemVariants} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Support Numbers</h2>
                    <p className="text-slate-500 text-sm">Add numbers for assignment by admins and agents.</p>
                  </div>
                </div>
                <button
                  onClick={refresh}
                  className="px-4 py-2 bg-white text-slate-600 rounded-xl hover:bg-slate-50 font-medium transition-colors border border-slate-200 shadow-sm text-sm"
                >
                  Refresh List
                </button>
              </div>

              {loading ? (
                <div className="p-12 flex justify-center">
                  <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit">
                    <h3 className="font-bold text-slate-900 mb-4">Add New Number</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          value={newSupportNumber}
                          onChange={e => setNewSupportNumber(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
                          placeholder="e.g. +1 800 555 1234"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Label (Optional)</label>
                        <input
                          type="text"
                          value={newSupportLabel}
                          onChange={e => setNewSupportLabel(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all bg-white"
                          placeholder="e.g. Sales Team"
                        />
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={add}
                          className="w-full py-2.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Number
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4">Number</th>
                            <th className="px-6 py-4">Label</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {supportNumbers.map(sn => (
                            <tr key={sn.id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4 font-medium text-slate-900">{sn.number}</td>
                              <td className="px-6 py-4">
                                {sn.label ? (
                                  <span className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                    {sn.label}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 italic text-sm">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => del(sn.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {supportNumbers.length === 0 && (
                            <tr>
                              <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                                <div className="flex flex-col items-center gap-3">
                                  <Phone className="w-8 h-8 opacity-20" />
                                  <p>No support numbers added yet.</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
