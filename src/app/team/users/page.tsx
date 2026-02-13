"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  CheckCircle,
  XCircle,
  Clock,
  User as UserIcon,
  ShieldAlert,
  ChevronDown,
  Eye,
  Copy,
  QrCode,
  Edit,
  Save,
  Check,
  Share2,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  Loader2
} from "lucide-react";
import QRCode from "qrcode";

interface TeamUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  status?: string;
  status_reason?: string | null;
  created_at: string;
  referred_by?: number | null;
}

export default function TeamUsersPage() {
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [onlyMyReferrals, setOnlyMyReferrals] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);
  const [statusModal, setStatusModal] = useState<{ userId: number; status: string; reason?: string } | null>(null);
  const [viewSubs, setViewSubs] = useState<{ userId: number; items: { application_id: number; updated_at: string; app_status: string; tag?: string | null }[] } | null>(null);
  const [viewSubmitDetail, setViewSubmitDetail] = useState<{ data?: Record<string, unknown> } | null>(null);
  const [viewProfile, setViewProfile] = useState<TeamUser | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedUserForSupport, setSelectedUserForSupport] = useState<TeamUser | null>(null);
  const [supportNumberInput, setSupportNumberInput] = useState("");
  const [savingSupport, setSavingSupport] = useState(false);
  const [supportNumbers, setSupportNumbers] = useState<{ id: number; number: string; label?: string | null }[]>([]);

  // Invite System State
  const [mySlug, setMySlug] = useState<string>("");
  const [tempSlug, setTempSlug] = useState("");
  const [isEditingSlug, setIsEditingSlug] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [includeQrInShare, setIncludeQrInShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [myUserId, setMyUserId] = useState<number | null>(null);

  const shareUrl = `${origin}/${mySlug}-ref/signup`;

  const shareOptions = [
    { name: "Copy Link", icon: Copy, action: () => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
    { name: "Email", icon: Mail, action: () => window.open(`mailto:?subject=Join%20Us&body=${encodeURIComponent(shareUrl)}`), color: "bg-red-50 text-red-600 hover:bg-red-100" },
    { name: "WhatsApp", icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`), color: "bg-green-50 text-green-600 hover:bg-green-100" },
    { name: "Facebook", icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`), color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { name: "Twitter", icon: Twitter, action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`), color: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
    { name: "LinkedIn", icon: Linkedin, action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`), color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
    { name: "System Share", icon: Share2, action: () => handleShare(), color: "bg-slate-800 text-white hover:bg-slate-900" },
  ];

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : "");
    (async () => {
      try {
        const res = await fetch("/api/team/users");
        const data = await res.json();
        if (!res.ok) setError(data.error || "Failed");
        else setUsers(data);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    })();

    // Fetch my profile for referral slug
    (async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
           const data = await res.json();
           setMySlug(data.referral_slug || "");
           setMyUserId(typeof data.id === "number" ? data.id : Number(data.id));
        }
      } catch (e) {
        console.error("Failed to fetch profile", e);
      }
    })();
  }, []);
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

  // Update QR code when slug/origin changes
  useEffect(() => {
    if (origin && mySlug) {
      const url = `${origin}/${mySlug}-ref/signup`;
      QRCode.toDataURL(url, { width: 400, margin: 2 }, (err, url) => {
        if (!err) setQrDataUrl(url);
      });
    }
  }, [origin, mySlug]);

  async function saveSlug() {
    setSlugError(null);
    if (!tempSlug.trim()) {
      setIsEditingSlug(false);
      return;
    }
    
    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: tempSlug }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setMySlug(data.slug);
        setIsEditingSlug(false);
      } else {
        setSlugError(data.error || "Update failed");
      }
    } catch {
      setSlugError("Update failed");
    }
  }

  function copyInviteLink() {
    const url = `${window.location.origin}/${mySlug}-ref/signup`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    const url = `${window.location.origin}/${mySlug}-ref/signup`;
    const shareData: ShareData = {
        title: "Join 5StarProcessing",
        text: "Sign up for 5StarProcessing using my referral link!",
        url: url
    };

    if (includeQrInShare && qrDataUrl) {
        try {
            const blob = await (await fetch(qrDataUrl)).blob();
            const file = new File([blob], "qrcode.png", { type: "image/png" });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                shareData.files = [file];
            }
        } catch (e) {
            console.error("Failed to prepare QR for share", e);
        }
    }

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            alert("Sharing not supported on this device/browser.");
        }
    } catch (e) {
        console.error("Share failed", e);
    }
  }

  function openAssignSupport(user: TeamUser) {
    setSelectedUserForSupport(user);
    setSupportNumberInput("");
    setShowSupportModal(true);
    setMenuOpenFor(null);
  }

  async function saveSupportNumberForUser() {
    if (!selectedUserForSupport) return;
    setSavingSupport(true);
    try {
      const res = await fetch("/api/admin/users/support-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserForSupport.id, customSupportNumber: supportNumberInput }),
      });
      if (res.ok) {
        setShowSupportModal(false);
        setSelectedUserForSupport(null);
        setSupportNumberInput("");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to assign support number");
      }
    } catch {
      setError("Failed to assign support number");
    } finally {
      setSavingSupport(false);
    }
  }

  function downloadQr() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${mySlug}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || (user.status || "pending").toLowerCase() === statusFilter;
    const matchesReferral = !onlyMyReferrals || (myUserId !== null && user.referred_by === myUserId);
    return matchesSearch && matchesStatus && matchesReferral;
  });

  // Stats calculation
  const totalUsers = users.length;
  const totalApproved = users.filter(u => (u.status || "").toLowerCase() === "approved").length;
  const totalPossed = users.filter(u => (u.status || "").toLowerCase() === "possed").length;
  const totalDeclined = users.filter(u => (u.status || "").toLowerCase() === "declined").length;
  const totalPending = users.filter(u => !(u.status) || (u.status || "").toLowerCase() === "pending").length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status: string | undefined) => {
    const s = (status || "pending").toLowerCase();
    if (s === "active" || s === "approved") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "possed") return "bg-violet-100 text-violet-700 border-violet-200";
    if (s === "pending") return "bg-amber-100 text-amber-700 border-amber-200";
    if (s === "rejected" || s === "declined") return "bg-red-100 text-red-700 border-red-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status: string | undefined) => {
    const s = (status || "pending").toLowerCase();
    if (s === "active" || s === "approved") return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
    if (s === "possed") return <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />;
    if (s === "pending") return <Clock className="w-3.5 h-3.5 mr-1.5" />;
    if (s === "rejected" || s === "declined") return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
    return <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getRandomGradient = (id: number) => {
    const gradients = [
      "from-blue-400 to-indigo-500",
      "from-rose-400 to-red-500",
      "from-emerald-400 to-teal-500",
      "from-amber-400 to-orange-500",
      "from-violet-400 to-purple-500",
    ];
    return gradients[id % gradients.length];
  };

  function openActions(userId: number) {
    setMenuOpenFor((prev) => (prev === userId ? null : userId));
  }

  function openStatus(user: TeamUser) {
    setStatusModal({ userId: user.id, status: (user.status || "Pending"), reason: user.status_reason || "" });
    setMenuOpenFor(null);
  }

  async function saveStatus() {
    if (!statusModal) return;
    const normalized = statusModal.status === "Currently Posed" ? "Possed" : statusModal.status;
    const res = await fetch("/api/team/user-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: statusModal.userId, status: normalized, reason: statusModal.reason }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map(u => u.id === statusModal.userId ? { ...u, status: normalized, status_reason: statusModal.reason || null } : u));
      setStatusModal(null);
    } else {
      const data = await res.json().catch(() => ({ error: "Update failed" }));
      setError(data.error || "Update failed");
    }
  }

  async function openSubmissions(userId: number) {
    try {
      const res = await fetch("/api/team/submints");
      const data = await res.json() as unknown;
      type SubmintsRow = { user_id: number; application_id: number; updated_at: string; app_status: string; tag?: string | null };
      if (res.ok && Array.isArray(data)) {
        const items = (data as SubmintsRow[]).filter((r) => r.user_id === userId).map((r) => ({
          application_id: r.application_id,
          updated_at: r.updated_at,
          app_status: r.app_status,
          tag: r.tag,
        }));
        setViewSubs({ userId, items });
      } else {
        const err = (data as { error?: string })?.error || "Failed to load submissions";
        setError(err);
      }
    } catch {
      setError("Failed to load submissions");
    } finally {
      setMenuOpenFor(null);
    }
  }

  function openUserProfile(user: TeamUser) {
    setViewProfile(user);
    setMenuOpenFor(null);
  }

  async function openSubmitDetail(appId: number) {
    try {
      const res = await fetch(`/api/team/submit/${appId}`);
      const data = await res.json();
      if (res.ok) setViewSubmitDetail(data);
      else setError("Failed to load submission details");
    } catch {
      setError("Failed to load submission details");
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Manage team members, permissions, and account status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all font-medium shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all font-medium shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-sm">{error}</div>}

      {/* Invite System */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left: Input & Share */}
          <div className="lg:col-span-2 space-y-6">
             <div>
               <h2 className="text-2xl font-bold mb-2">Invite Clients</h2>
               <p className="text-brand-100 text-sm max-w-lg">Share your unique referral link. Clients who sign up via this link will be automatically attributed to you.</p>
             </div>

             {/* URL Input Group */}
             <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-brand-200 uppercase tracking-wider">Your Referral Link</label>
                <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20 backdrop-blur-sm w-full max-w-xl">
                    {isEditingSlug ? (
                       <div className="flex items-center gap-2 w-full px-2">
                          <span className="text-brand-200 text-sm whitespace-nowrap">{origin}/</span>
                          <input 
                            value={tempSlug}
                            onChange={e => setTempSlug(e.target.value)}
                            className="bg-transparent border-none text-white placeholder-brand-200 focus:outline-none w-full text-sm font-medium"
                            placeholder="your-slug"
                            autoFocus
                          />
                          <span className="text-brand-200 text-sm whitespace-nowrap">-ref/signup</span>
                       </div>
                    ) : (
                       <div className="px-3 py-1.5 text-sm font-medium text-white truncate w-full flex items-center">
                          <span className="truncate">{origin}/{mySlug}-ref/signup</span>
                       </div>
                    )}
                    
                    <div className="flex items-center gap-1 shrink-0">
                        {isEditingSlug ? (
                           <button onClick={saveSlug} className="p-2 bg-white text-brand-600 rounded-lg hover:bg-brand-50 transition-colors shadow-sm" title="Save">
                              <Save className="w-4 h-4" />
                           </button>
                        ) : (
                           <>
                             <button onClick={() => { setIsEditingSlug(true); setTempSlug(mySlug); }} className="p-2 hover:bg-white/10 text-brand-100 hover:text-white rounded-lg transition-colors" title="Edit Slug">
                                <Edit className="w-4 h-4" />
                             </button>
                             <button onClick={copyInviteLink} className="flex items-center gap-2 px-3 py-1.5 bg-white text-brand-600 rounded-lg text-sm font-bold hover:bg-brand-50 transition-colors shadow-sm">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy"}
                             </button>
                           </>
                        )}
                    </div>
                </div>
                {slugError && <p className="text-red-200 text-xs bg-red-500/20 px-2 py-1 rounded inline-block self-start">{slugError}</p>}
             </div>

             {/* Share Options */}
             <div className="space-y-3">
                <button 
                  onClick={() => setShowShareModal(true)} 
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-colors font-bold w-full justify-center"
                >
                    <Share2 className="w-5 h-5" />
                    <span>Share Signup Link</span>
                </button>
             </div>
          </div>

          {/* Right: Live QR Code */}
          <div className="flex flex-col items-center justify-center lg:items-end">
             <div className="bg-white p-4 rounded-2xl shadow-xl">
                {qrDataUrl ? (
                   <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 rounded-lg" />
                ) : (
                   <div className="w-48 h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <Loader2 className="w-8 h-8 animate-spin" />
                   </div>
                )}
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
                   <button 
                     onClick={downloadQr}
                     className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors w-full justify-center py-2 hover:bg-slate-50 rounded-xl"
                   >
                      <Download className="w-4 h-4" />
                      <span>Download QR</span>
                   </button>
                </div>
             </div>
          </div>

        </div>
      </motion.div>

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
                  <XCircle className="w-5 h-5" />
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

                <div className="flex items-center gap-2 pt-2 cursor-pointer group justify-center" onClick={() => setIncludeQrInShare(!includeQrInShare)}>
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeQrInShare ? "bg-brand-600 border-brand-600 text-white" : "border-slate-300 group-hover:border-slate-400"}`}>
                      {includeQrInShare && <Check className="w-3.5 h-3.5" />}
                   </div>
                   <span className="text-sm text-slate-600 group-hover:text-slate-900 select-none">Add QR Code image to Share</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Clients", value: totalUsers, icon: UserIcon, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Approved", value: totalApproved, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Possed", value: totalPossed, icon: ShieldAlert, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Total Declined", value: totalDeclined, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
          { label: "Total Pending", value: totalPending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{loading ? "-" : stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-brand-500 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="possed">Possed</option>
                <option value="declined">Declined</option>
                <option value="pending">Pending</option>
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-50">
              <input 
                type="checkbox" 
                checked={onlyMyReferrals} 
                onChange={() => setOnlyMyReferrals(v => !v)} 
                className="accent-brand-600"
              />
              <span>My Referrals</span>
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">User</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="py-4 px-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-10 w-48 bg-slate-100 rounded-lg" /></td>
                    <td className="py-4 px-6"><div className="h-4 w-32 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-6"><div className="h-6 w-20 bg-slate-100 rounded-full" /></td>
                    <td className="py-4 px-6"><div className="h-4 w-24 bg-slate-100 rounded" /></td>
                    <td className="py-4 px-6"><div className="h-8 w-8 bg-slate-100 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRandomGradient(user.id)} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{user.name}</div>
                          <div className="text-xs text-slate-500">ID: #{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {user.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status || "Pending"}</span>
                      </div>
                      {user.status_reason && (
                        <div className="text-xs text-slate-400 mt-1 max-w-[150px] truncate" title={user.status_reason}>
                          {user.status_reason}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600 font-medium">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="relative inline-block text-left">
                        <button onClick={() => openActions(user.id)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {menuOpenFor === user.id && (
                          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-lg z-10">
                            <button onClick={() => openStatus(user)} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">Edit Status</button>
                            <button onClick={() => openSubmissions(user.id)} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">View Submissions</button>
                            <button onClick={() => openUserProfile(user)} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">View Profile</button>
                            <button onClick={() => openAssignSupport(user)} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">Assign Support Number</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <UserIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No users found</h3>
                    <p className="text-slate-500 text-sm">Try adjusting your search or filter settings.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Status Modal */}
        {statusModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Change Client Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={statusModal.status}
                    onChange={(e) => setStatusModal({ ...statusModal, status: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                    <option value="Possed">Possed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reason (Optional)</label>
                  <input
                    type="text"
                    value={statusModal.reason || ""}
                    onChange={(e) => setStatusModal({ ...statusModal, reason: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    placeholder="Enter reason..."
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setStatusModal(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Cancel</button>
                  <button onClick={saveStatus} className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 shadow-lg shadow-brand-600/20">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Number Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Assign Support Number</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Support Number</label>
                  <select
                    value={supportNumberInput}
                    onChange={(e) => setSupportNumberInput(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  >
                    <option value="">Choose number...</option>
                    {supportNumbers.map(sn => (
                      <option key={sn.id} value={sn.number}>{sn.number}{sn.label ? ` — ${sn.label}` : ""}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setShowSupportModal(false)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Cancel</button>
                  <button onClick={saveSupportNumberForUser} disabled={savingSupport} className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 shadow-lg shadow-brand-600/20 disabled:opacity-50">
                    {savingSupport ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submissions Modal */}
        {viewSubs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Client Submissions</h3>
                <button onClick={() => setViewSubs(null)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-left text-slate-500 font-medium uppercase text-xs tracking-wider">
                      <th className="py-3 px-4">Application</th>
                      <th className="py-3 px-4">Updated</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Tag</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {viewSubs.items.map((it) => (
                      <tr key={it.application_id}>
                        <td className="py-3 px-4 font-medium text-slate-900">#{it.application_id}</td>
                        <td className="py-3 px-4 text-slate-600">{new Date(it.updated_at).toLocaleString()}</td>
                        <td className="py-3 px-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize">{it.app_status.replace("_", " ")}</span></td>
                        <td className="py-3 px-4 text-slate-600">{it.tag || "-"}</td>
                        <td className="py-3 px-4 text-right">
                          <button 
                            onClick={() => openSubmitDetail(it.application_id)}
                            className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!viewSubs.items.length && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-500">No submissions found for this client</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setViewSubs(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {viewProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Client Profile</h3>
                <button onClick={() => setViewProfile(null)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRandomGradient(viewProfile.id)} flex items-center justify-center text-white font-bold`}>
                    {getInitials(viewProfile.name)}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-900">{viewProfile.name}</div>
                    <div className="text-xs text-slate-500">ID: #{viewProfile.id}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs text-slate-500 uppercase">Email</span>
                    <span className="font-medium text-slate-900">{viewProfile.email}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs text-slate-500 uppercase">Phone</span>
                    <span className="font-medium text-slate-900">{viewProfile.phone || "N/A"}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs text-slate-500 uppercase">Status</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(viewProfile.status)}`}>
                      {getStatusIcon(viewProfile.status)}
                      <span className="ml-1 capitalize">{viewProfile.status || "Pending"}</span>
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs text-slate-500 uppercase">Joined</span>
                    <span className="font-medium text-slate-900">{new Date(viewProfile.created_at).toLocaleString()}</span>
                  </div>
                </div>
                {viewProfile.status_reason && (
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="block text-xs text-slate-500 uppercase">Status Reason</span>
                    <span className="font-medium text-slate-900 break-words">{viewProfile.status_reason}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setViewProfile(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Close</button>
              </div>
            </div>
          </div>
        )}
        {/* Submission Detail Modal */}
        {viewSubmitDetail && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-xl font-bold text-slate-900">Submission Details</h3>
                <button onClick={() => setViewSubmitDetail(null)} className="text-slate-400 hover:text-slate-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(viewSubmitDetail.data || {}).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
                        {key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                      </span>
                      {value && typeof value === "object" && !Array.isArray(value) ? (
                        <div className="space-y-1">
                          {Object.entries(value as Record<string, unknown>).map(([subKey, subVal]) => (
                            <div key={subKey} className="flex items-start justify-between gap-3">
                              <span className="text-xs text-slate-500">
                                {subKey.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim().toUpperCase()}
                              </span>
                              <span className="font-medium text-slate-900 break-words">
                                {subVal === null || subVal === undefined
                                  ? "-"
                                  : typeof subVal === "boolean"
                                  ? subVal ? "Yes" : "No"
                                  : String(subVal)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : Array.isArray(value) ? (
                        <div className="space-y-1">
                          {(value as unknown[]).map((item, i) => (
                            <div key={i} className="flex items-start justify-between gap-3">
                              <span className="text-xs text-slate-500">Item {i + 1}</span>
                              <span className="font-medium text-slate-900 break-words">
                                {item === null || item === undefined
                                  ? "-"
                                  : typeof item === "object"
                                  ? JSON.stringify(item)
                                  : String(item)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="font-medium text-slate-900 break-words">
                          {value === null || value === undefined
                            ? "-"
                            : typeof value === "boolean"
                            ? value ? "Yes" : "No"
                            : String(value)}
                        </span>
                      )}
                    </div>
                  ))}
                  {Object.keys(viewSubmitDetail.data || {}).length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      No data available
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={() => setViewSubmitDetail(null)} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{filteredUsers.length}</span> of <span className="font-medium text-slate-900">{totalUsers}</span> users
          </div>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">Previous</button>
            <button disabled className="px-3 py-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">Next</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
