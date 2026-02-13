"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Download, 
  Mail, 
  CheckCircle,
  XCircle,
  Clock,
  User as UserIcon,
  ShieldAlert,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  Loader2,
  Users
} from "lucide-react";
import QRCode from "qrcode";

interface ReferralUser {
  id: number;
  name: string;
  email: string;
  status?: string;
  created_at: string;
}

export default function ReferralDashboardPage() {
  const [users, setUsers] = useState<ReferralUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [includeQrInShare, setIncludeQrInShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const shareOptions = [
    { name: "Copy Link", icon: Copy, action: () => { navigator.clipboard.writeText(referralUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }, color: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
    { name: "Email", icon: Mail, action: () => window.open(`mailto:?subject=Join%20Us&body=${encodeURIComponent(referralUrl)}`), color: "bg-red-50 text-red-600 hover:bg-red-100" },
    { name: "WhatsApp", icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${encodeURIComponent(referralUrl)}`), color: "bg-green-50 text-green-600 hover:bg-green-100" },
    { name: "Facebook", icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`), color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
    { name: "Twitter", icon: Twitter, action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralUrl)}`), color: "bg-sky-50 text-sky-600 hover:bg-sky-100" },
    { name: "LinkedIn", icon: Linkedin, action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`), color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
    { name: "System Share", icon: Share2, action: () => handleShare(), color: "bg-slate-800 text-white hover:bg-slate-900" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/affiliate/referrals");
        const data = await res.json();
        if (!res.ok) {
           setError(data.error || "Failed to load referrals");
        } else {
           setUsers(data.referrals || []);
           setReferralUrl(data.referralUrl || "");
        }
      } catch {
        setError("Failed to load referrals");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Update QR code when url changes
  useEffect(() => {
    if (referralUrl) {
      QRCode.toDataURL(referralUrl, { width: 400, margin: 2 }, (err, url) => {
        if (!err) setQrDataUrl(url);
      });
    }
  }, [referralUrl]);

  async function handleShare() {
    const shareData: ShareData = {
        title: "Join 5StarProcessing",
        text: "Sign up for 5StarProcessing using my referral link!",
        url: referralUrl
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

  function downloadQr() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `referral-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filter users
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats calculation
  const totalUsers = users.length;
  const totalApproved = users.filter(u => (u.status || "").toLowerCase() === "approved").length;
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

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-brand-600" />
        </div>
    );
  }

  if (error) {
      return (
          <div className="p-8">
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                  {error}
              </div>
          </div>
      );
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Referrals Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your referred clients and earnings.</p>
        </div>
      </div>

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
                   <div className="px-3 py-1.5 text-sm font-medium text-white truncate w-full flex items-center">
                      <span className="truncate">{referralUrl}</span>
                   </div>
                   
                   <div className="flex items-center gap-1 shrink-0">
                     <button onClick={() => { navigator.clipboard.writeText(referralUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="flex items-center gap-2 px-3 py-1.5 bg-white text-brand-600 rounded-lg text-sm font-bold hover:bg-brand-50 transition-colors shadow-sm">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy"}
                     </button>
                   </div>
                </div>
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
                  <span className="text-sm text-slate-600 font-mono truncate">{referralUrl}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(referralUrl);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Referred", value: totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Approved", value: totalApproved, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Approval", value: totalPending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
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
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
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
              placeholder="Search referrals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Client</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRandomGradient(user.id)} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white`}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">ID: #{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status || "Pending"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600 font-medium">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No referrals found</h3>
                    <p className="text-slate-500 text-sm">Start sharing your link to earn commissions!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
