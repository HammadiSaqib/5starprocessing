"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Users, 
  Landmark, 
  FileText, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  ShieldCheck,
  CreditCard,
  LayoutDashboard,
  ArrowRight,
  Info
} from "lucide-react";

type Section = "company" | "processing" | "ownership" | "banking" | "documents" | "review";

export default function ApplicationPage({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const [section, setSection] = useState<Section>("company");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<string>("application");
  const [tag, setTag] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(true);

  // State Definitions (Preserved)
  const [company, setCompany] = useState({ 
    products: "", legalName: "", dba: "", email: "", phone: "", 
    address1: "", address2: "", city: "", state: "", postal: "", 
    bankAccount: "", bankRouting: "", incorporatedDate: "", taxId: "", 
    website: "", websiteActive: false, websiteInactiveReason: "", 
    customerSupportNumber: "", principalsCount: 1, businessStructure: "" 
  });
  
  const [processing, setProcessing] = useState({
    billingModel: [] as string[],
    acceptanceWays: [] as string[],
    majorityType: "",
    tmfMatch: false,
    bankruptcy: false,
    bankruptcyDetail: "",
    monthlyVolume: "",
    averageSale: "",
    highestSale: ""
  });
  
  const [ownership, setOwnership] = useState({ 
    owner1: {
      firstName: "", lastName: "", percent: "", 
      address1: "", address2: "", city: "", state: "", postal: "", 
      email: "", phone: "", ssn: "", dob: "", dlNumber: "", dlState: ""
    },
    owner2: {
      firstName: "", lastName: "", percent: "", 
      address1: "", address2: "", city: "", state: "", postal: "", 
      email: "", phone: "", ssn: "", dob: "", dlNumber: "", dlState: ""
    }
  });
  
  const [banking, setBanking] = useState({ bankName: "", routing: "", account: "" });
  const [uploading, setUploading] = useState(false);
  
  interface DocumentItem { id: number; doc_type: string; file_path: string; status: string }
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Logic Functions (Preserved)
  async function saveSection(s: Section, data: unknown) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", section: s, data }),
      });
      if (!res.ok) setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function submitApplication() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/portal/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit" }),
      });
      if (res.ok) {
        setSubmitted(true);
        router.replace("/dashboard");
      } else {
        setError("Submit failed");
      }
    } finally {
      setSaving(false);
    }
  }

  async function uploadDoc(docType: string, file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("docType", docType);
      fd.append("file", file);
      const res = await fetch("/api/portal/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Upload failed");
      else {
        setDocuments((d) => [
          { id: data.id, doc_type: docType, file_path: data.filePath, status: "uploaded" },
          ...d,
        ]);
      }
    } finally {
      setUploading(false);
    }
  }

  // Effects (Preserved)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/application");
        if (res.ok) {
          const data = await res.json();
          setStatus(String(data.status || "application"));
          setTag(data.tag || null);
          setDocuments(Array.isArray(data.documents) ? data.documents : []);
          if (data.status === "video" || data.status === "prequal") {
            router.replace("/portal/video");
            return;
          }
          if (data.status === "disqualified") {
            router.replace("/portal/disqualified");
            return;
          }
          if (data.status === "under_review" || data.status === "approved") {
            setSubmitted(true);
            setEditable(false);
          } else {
            setSubmitted(false);
            setEditable(true);
          }
        }
      } catch {}
    })();
  }, [router]);

  useEffect(() => { if (editable) saveSection("company", company); }, [company, editable]);
  useEffect(() => { if (editable) saveSection("ownership", ownership); }, [ownership, editable]);
  useEffect(() => { if (editable) saveSection("banking", banking); }, [banking, editable]);
  useEffect(() => { if (editable) saveSection("processing", processing); }, [processing, editable]);

  const navItems = [
    { id: "company", label: "Company Info", sub: "Basic details", icon: Building2 },
    { id: "processing", label: "Processing", sub: "Volumes & methods", icon: CreditCard },
    { id: "ownership", label: "Ownership", sub: "Principals", icon: Users },
    { id: "banking", label: "Banking", sub: "Settlement account", icon: Landmark },
    { id: "documents", label: "Documents", sub: "Required files", icon: FileText },
    { id: "review", label: "Submit", sub: "Finalize", icon: Send },
  ];

  const Container = embedded ? "div" : "main";
  const containerClass = embedded ? "font-sans text-slate-900 w-full" : "min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-12";
  const wrapperClass = embedded ? "w-full" : "max-w-7xl mx-auto";

  // New UI Components
  const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-slate-500 mt-2 text-lg">{subtitle}</p>}
    </div>
  );

  const InputGroup = ({ label, children, className="" }: { label: string, children: React.ReactNode, className?: string }) => (
    <div className={`group ${className}`}>
      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide opacity-80 group-focus-within:text-brand-600 group-focus-within:opacity-100 transition-all">{label}</label>
      {children}
    </div>
  );

  const ModernInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      {...props}
      className={`w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all duration-300 outline-none font-medium placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed ${props.className}`}
    />
  );

  const SelectCard = ({ active, onClick, children, className="" }: { active: boolean, onClick: () => void, children: React.ReactNode, className?: string }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={!editable}
      className={`relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 text-left w-full ${
        active 
          ? "border-brand-500 bg-brand-50/50 text-brand-700 shadow-lg shadow-brand-500/10" 
          : "border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      } ${className}`}
    >
      {active && (
        <div className="absolute top-3 right-3 text-brand-500">
          <CheckCircle className="w-5 h-5 fill-brand-100" />
        </div>
      )}
      {children}
    </button>
  );

  return (
    <Container className={containerClass}>
      <div className={wrapperClass}>
        {/* Modern Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Application Portal
              </span>
              {tag && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {tag}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Merchant Application
            </h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">
              Complete your profile to start processing with <span className="text-brand-600">Star Processing</span>.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
             <div className="px-6 py-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status === 'approved' ? 'bg-emerald-500' : 'bg-brand-500'} animate-pulse`} />
                  <span className="font-bold text-slate-900 capitalize">{status.replace("_", " ")}</span>
                </div>
             </div>
             {!editable && (
               <div className="px-6 py-3 border-l border-slate-100">
                 <div className="flex items-center gap-2 text-amber-600 font-bold">
                   <ShieldCheck className="w-5 h-5" />
                   <span>Read Only</span>
                 </div>
               </div>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 lg:sticky lg:top-8 space-y-4">
            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = section === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSection(item.id as Section)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                        isActive 
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-white"}`}>
                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                      </div>
                      <div className="text-left">
                        <div className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-700"}`}>{item.label}</div>
                        <div className={`text-xs ${isActive ? "text-brand-100" : "text-slate-400"}`}>{item.sub}</div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <h3 className="font-bold text-lg mb-1">Need Help?</h3>
              <p className="text-slate-400 text-sm mb-4">Our support team is standing by to assist you.</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors backdrop-blur-md border border-white/10">
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 min-h-[600px]"
              >
                {!editable && (
                  <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-900 flex items-center gap-3 font-medium">
                    <Info className="w-5 h-5 text-amber-600" />
                    <p>Application is under review. Editing is disabled.</p>
                  </div>
                )}

                {section === "company" && (
                  <div className="space-y-8 max-w-4xl">
                    <SectionTitle title="Company Information" subtitle="Tell us about your business structure and contact details." />
                    
                    <div className="grid grid-cols-1 gap-8">
                      <InputGroup label="Products & Services">
                        <textarea 
                          placeholder="Describe exactly what your business sells or provides..." 
                          disabled={!editable} 
                          rows={3}
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none font-medium resize-none"
                          value={company.products} 
                          onChange={(e)=>setCompany({...company, products:e.target.value})} 
                        />
                      </InputGroup>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="Legal Name">
                          <ModernInput 
                            placeholder="e.g. Acme Corp LLC" 
                            disabled={!editable} 
                            value={company.legalName} 
                            onChange={(e)=>setCompany({...company, legalName:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="DBA (Doing Business As)">
                          <ModernInput 
                            placeholder="e.g. Acme Solutions" 
                            disabled={!editable} 
                            value={company.dba} 
                            onChange={(e)=>setCompany({...company, dba:e.target.value})} 
                          />
                        </InputGroup>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-6">
                         <h4 className="font-bold text-slate-900 flex items-center gap-2">
                           <LayoutDashboard className="w-5 h-5 text-brand-500" /> Contact Details
                         </h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Company Email">
                              <ModernInput 
                                placeholder="official@company.com" 
                                disabled={!editable} 
                                value={company.email} 
                                onChange={(e)=>setCompany({...company, email:e.target.value})} 
                              />
                            </InputGroup>
                            <InputGroup label="Phone Number">
                              <ModernInput 
                                placeholder="(555) 123-4567" 
                                disabled={!editable} 
                                value={company.phone} 
                                onChange={(e)=>setCompany({...company, phone:e.target.value})} 
                              />
                            </InputGroup>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="Address Line 1">
                          <ModernInput 
                            placeholder="123 Business Rd"
                            disabled={!editable} 
                            value={company.address1} 
                            onChange={(e)=>setCompany({...company, address1:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="Address Line 2 (Optional)">
                          <ModernInput 
                            placeholder="Suite 200"
                            disabled={!editable} 
                            value={company.address2} 
                            onChange={(e)=>setCompany({...company, address2:e.target.value})} 
                          />
                        </InputGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputGroup label="City">
                          <ModernInput 
                            disabled={!editable} 
                            value={company.city} 
                            onChange={(e)=>setCompany({...company, city:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="State">
                          <ModernInput 
                            disabled={!editable} 
                            value={company.state} 
                            onChange={(e)=>setCompany({...company, state:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="Zip Code">
                          <ModernInput 
                            disabled={!editable} 
                            value={company.postal} 
                            onChange={(e)=>setCompany({...company, postal:e.target.value})} 
                          />
                        </InputGroup>
                      </div>
                      
                      <div className="h-px bg-slate-100 my-4"></div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputGroup label="Date Incorporated">
                          <ModernInput 
                            placeholder="MM-DD-YYYY" 
                            disabled={!editable} 
                            value={company.incorporatedDate} 
                            onChange={(e)=>setCompany({...company, incorporatedDate:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="Tax ID (EIN)">
                          <ModernInput 
                            placeholder="XX-XXXXXXX"
                            disabled={!editable} 
                            value={company.taxId} 
                            onChange={(e)=>setCompany({...company, taxId:e.target.value})} 
                          />
                        </InputGroup>
                        <InputGroup label="Business Structure">
                          <ModernInput 
                            placeholder="LLC, Inc, etc."
                            disabled={!editable} 
                            value={company.businessStructure} 
                            onChange={(e)=>setCompany({...company, businessStructure:e.target.value})} 
                          />
                        </InputGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="Website URL">
                           <ModernInput 
                              placeholder="https://"
                              disabled={!editable} 
                              value={company.website} 
                              onChange={(e)=>setCompany({...company, website:e.target.value})} 
                            />
                        </InputGroup>
                        <InputGroup label="Website Active?">
                           <div className="flex gap-4">
                              <SelectCard 
                                active={company.websiteActive} 
                                onClick={()=>setCompany({...company, websiteActive:true})}
                                className="flex-1 text-center justify-center py-3"
                              >
                                <span className="font-bold">Yes</span>
                              </SelectCard>
                              <SelectCard 
                                active={!company.websiteActive} 
                                onClick={()=>setCompany({...company, websiteActive:false})}
                                className="flex-1 text-center justify-center py-3"
                              >
                                <span className="font-bold">No</span>
                              </SelectCard>
                           </div>
                        </InputGroup>
                      </div>
                      
                      {!company.websiteActive && (
                        <InputGroup label="Reason for Inactive Website">
                          <ModernInput 
                            placeholder="Under construction, new business, etc."
                            disabled={!editable} 
                            value={company.websiteInactiveReason} 
                            onChange={(e)=>setCompany({...company, websiteInactiveReason:e.target.value})} 
                          />
                        </InputGroup>
                      )}
                    </div>
                  </div>
                )}

                {section === "processing" && (
                  <div className="space-y-8 max-w-4xl">
                    <SectionTitle title="Processing Details" subtitle="How do you accept payments and what are your volumes?" />
                    
                    <div className="grid grid-cols-1 gap-8">
                      <InputGroup label="Billing Model">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {["Subscription","One-time","Installments","Usage-based","Wholesale","Retail"].map(opt=>(
                            <SelectCard 
                              key={opt}
                              active={processing.billingModel.includes(opt)}
                              onClick={()=>{
                                const has = processing.billingModel.includes(opt);
                                setProcessing({...processing, billingModel: has ? processing.billingModel.filter(o=>o!==opt) : [...processing.billingModel, opt]});
                              }}
                              className="py-3 px-4 text-sm"
                            >
                              <span className="font-bold">{opt}</span>
                            </SelectCard>
                          ))}
                        </div>
                      </InputGroup>

                      <InputGroup label="Payment Methods">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {["In Person","Online","By Phone","Invoices","Mobile","Other"].map(opt=>(
                            <SelectCard 
                              key={opt}
                              active={processing.acceptanceWays.includes(opt)}
                              onClick={()=>{
                                const has = processing.acceptanceWays.includes(opt);
                                setProcessing({...processing, acceptanceWays: has ? processing.acceptanceWays.filter(o=>o!==opt) : [...processing.acceptanceWays, opt]});
                              }}
                              className="py-3 px-4 text-sm"
                            >
                              <span className="font-bold">{opt}</span>
                            </SelectCard>
                          ))}
                        </div>
                      </InputGroup>

                      <InputGroup label="Majority Payment Type">
                        <ModernInput 
                          placeholder="e.g., 90% online, 10% invoice"
                          disabled={!editable} 
                          value={processing.majorityType} 
                          onChange={(e)=>setProcessing({...processing, majorityType:e.target.value})} 
                        />
                      </InputGroup>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InputGroup label="Monthly Volume">
                          <ModernInput 
                             placeholder="$0.00"
                             disabled={!editable} 
                             value={processing.monthlyVolume} 
                             onChange={(e)=>setProcessing({...processing, monthlyVolume:e.target.value})} 
                           />
                        </InputGroup>
                        <InputGroup label="Avg. Sale Amount">
                          <ModernInput 
                             placeholder="$0.00"
                             disabled={!editable} 
                             value={processing.averageSale} 
                             onChange={(e)=>setProcessing({...processing, averageSale:e.target.value})} 
                           />
                        </InputGroup>
                        <InputGroup label="Highest Sale Amount">
                          <ModernInput 
                             placeholder="$0.00"
                             disabled={!editable} 
                             value={processing.highestSale} 
                             onChange={(e)=>setProcessing({...processing, highestSale:e.target.value})} 
                           />
                        </InputGroup>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="TMF/MATCH History">
                          <div className="flex gap-4">
                             <SelectCard active={processing.tmfMatch} onClick={()=>setProcessing({...processing, tmfMatch:true})} className="flex-1 text-center py-3"><span className="font-bold">Yes</span></SelectCard>
                             <SelectCard active={!processing.tmfMatch} onClick={()=>setProcessing({...processing, tmfMatch:false})} className="flex-1 text-center py-3"><span className="font-bold">No</span></SelectCard>
                          </div>
                        </InputGroup>
                        <InputGroup label="Bankruptcy History">
                          <div className="flex gap-4">
                             <SelectCard active={processing.bankruptcy} onClick={()=>setProcessing({...processing, bankruptcy:true})} className="flex-1 text-center py-3"><span className="font-bold">Yes</span></SelectCard>
                             <SelectCard active={!processing.bankruptcy} onClick={()=>setProcessing({...processing, bankruptcy:false})} className="flex-1 text-center py-3"><span className="font-bold">No</span></SelectCard>
                          </div>
                        </InputGroup>
                      </div>
                      
                      {processing.bankruptcy && (
                        <InputGroup label="Bankruptcy Details">
                          <ModernInput 
                            placeholder="Please provide date and type..."
                            disabled={!editable} 
                            value={processing.bankruptcyDetail} 
                            onChange={(e)=>setProcessing({...processing, bankruptcyDetail:e.target.value})} 
                          />
                        </InputGroup>
                      )}
                    </div>
                  </div>
                )}

                {section === "ownership" && (
                  <div className="space-y-10 max-w-4xl">
                     <SectionTitle title="Business Owners" subtitle="Details for all principals with 25% or more ownership." />
                     
                     {/* Owner 1 */}
                     <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">1</div>
                           <h3 className="text-xl font-bold text-slate-900">Primary Owner</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputGroup label="First Name"><ModernInput disabled={!editable} value={ownership.owner1.firstName} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, firstName:e.target.value}})} /></InputGroup>
                              <InputGroup label="Last Name"><ModernInput disabled={!editable} value={ownership.owner1.lastName} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, lastName:e.target.value}})} /></InputGroup>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="Ownership %"><ModernInput type="number" disabled={!editable} value={ownership.owner1.percent} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, percent:e.target.value}})} /></InputGroup>
                              <InputGroup label="Email"><ModernInput disabled={!editable} value={ownership.owner1.email} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, email:e.target.value}})} /></InputGroup>
                              <InputGroup label="Phone"><ModernInput disabled={!editable} value={ownership.owner1.phone} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, phone:e.target.value}})} /></InputGroup>
                           </div>
                           <InputGroup label="Home Address"><ModernInput disabled={!editable} value={ownership.owner1.address1} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, address1:e.target.value}})} /></InputGroup>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="City"><ModernInput disabled={!editable} value={ownership.owner1.city} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, city:e.target.value}})} /></InputGroup>
                              <InputGroup label="State"><ModernInput disabled={!editable} value={ownership.owner1.state} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, state:e.target.value}})} /></InputGroup>
                              <InputGroup label="Zip"><ModernInput disabled={!editable} value={ownership.owner1.postal} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, postal:e.target.value}})} /></InputGroup>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="SSN"><ModernInput disabled={!editable} value={ownership.owner1.ssn} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, ssn:e.target.value}})} /></InputGroup>
                              <InputGroup label="DOB"><ModernInput placeholder="MM-DD-YYYY" disabled={!editable} value={ownership.owner1.dob} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, dob:e.target.value}})} /></InputGroup>
                              <InputGroup label="DL Number"><ModernInput disabled={!editable} value={ownership.owner1.dlNumber} onChange={(e)=>setOwnership({...ownership, owner1:{...ownership.owner1, dlNumber:e.target.value}})} /></InputGroup>
                           </div>
                        </div>
                     </div>

                     {/* Owner 2 */}
                     <div className="bg-white rounded-3xl p-8 border border-slate-200">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">2</div>
                           <h3 className="text-xl font-bold text-slate-900">Secondary Owner (Optional)</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputGroup label="First Name"><ModernInput disabled={!editable} value={ownership.owner2.firstName} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, firstName:e.target.value}})} /></InputGroup>
                              <InputGroup label="Last Name"><ModernInput disabled={!editable} value={ownership.owner2.lastName} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, lastName:e.target.value}})} /></InputGroup>
                           </div>
                           {/* Simplified for Owner 2 to save space in preview, but fully functional */}
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="Ownership %"><ModernInput type="number" disabled={!editable} value={ownership.owner2.percent} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, percent:e.target.value}})} /></InputGroup>
                              <InputGroup label="Email"><ModernInput disabled={!editable} value={ownership.owner2.email} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, email:e.target.value}})} /></InputGroup>
                              <InputGroup label="Phone"><ModernInput disabled={!editable} value={ownership.owner2.phone} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, phone:e.target.value}})} /></InputGroup>
                           </div>
                           <InputGroup label="Home Address"><ModernInput disabled={!editable} value={ownership.owner2.address1} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, address1:e.target.value}})} /></InputGroup>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="City"><ModernInput disabled={!editable} value={ownership.owner2.city} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, city:e.target.value}})} /></InputGroup>
                              <InputGroup label="State"><ModernInput disabled={!editable} value={ownership.owner2.state} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, state:e.target.value}})} /></InputGroup>
                              <InputGroup label="Zip"><ModernInput disabled={!editable} value={ownership.owner2.postal} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, postal:e.target.value}})} /></InputGroup>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <InputGroup label="SSN"><ModernInput disabled={!editable} value={ownership.owner2.ssn} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, ssn:e.target.value}})} /></InputGroup>
                              <InputGroup label="DOB"><ModernInput placeholder="MM-DD-YYYY" disabled={!editable} value={ownership.owner2.dob} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, dob:e.target.value}})} /></InputGroup>
                              <InputGroup label="DL Number"><ModernInput disabled={!editable} value={ownership.owner2.dlNumber} onChange={(e)=>setOwnership({...ownership, owner2:{...ownership.owner2, dlNumber:e.target.value}})} /></InputGroup>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {section === "banking" && (
                  <div className="space-y-8 max-w-2xl">
                    <SectionTitle title="Banking Information" subtitle="Where should we send your payouts?" />
                    
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <div className="relative z-10 space-y-6">
                        <InputGroup label="Bank Name" className="text-slate-300">
                          <input 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:bg-white/20 focus:border-brand-500 transition-all outline-none backdrop-blur-md"
                            placeholder="e.g. Chase Bank"
                            disabled={!editable}
                            value={banking.bankName}
                            onChange={(e)=>setBanking({...banking, bankName:e.target.value})}
                          />
                        </InputGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <InputGroup label="Routing Number" className="text-slate-300">
                              <input 
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:bg-white/20 focus:border-brand-500 transition-all outline-none backdrop-blur-md font-mono tracking-widest"
                                placeholder="000000000"
                                maxLength={9}
                                disabled={!editable}
                                value={banking.routing}
                                onChange={(e)=>setBanking({...banking, routing:e.target.value})}
                              />
                           </InputGroup>
                           <InputGroup label="Account Number" className="text-slate-300">
                              <input 
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:bg-white/20 focus:border-brand-500 transition-all outline-none backdrop-blur-md font-mono tracking-widest"
                                placeholder="000000000000"
                                disabled={!editable}
                                value={banking.account}
                                onChange={(e)=>setBanking({...banking, account:e.target.value})}
                              />
                           </InputGroup>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p>Please ensure the account holder name matches the Legal Business Name or DBA Name provided in the Company Info section to avoid funding delays.</p>
                    </div>
                  </div>
                )}

                {section === "documents" && (
                  <div className="space-y-8 max-w-5xl">
                    <SectionTitle title="Required Documents" subtitle="Please upload legible copies of the following documents." />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { label: "Bank Statement", type: "bank_statement", desc: "Last 3 months business bank statements" },
                        { label: "Driver License", type: "driver_license", desc: "Color copy of front and back" },
                        { label: "Voided Check", type: "voided_check", desc: "Must show business name" },
                        { label: "Merchant Statement", type: "merchant_statement", desc: "Previous processing history (if any)" },
                        { label: "Government ID", type: "government_id", desc: "Passport or State ID" },
                        { label: "Other Documents", type: "additional", desc: "Any additional supporting files" }
                      ].map((doc) => (
                        <div key={doc.type} className="group relative bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-brand-200 transition-all duration-300">
                           <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-brand-50 text-slate-400 group-hover:text-brand-500 flex items-center justify-center mb-4 transition-colors">
                              <Upload className="w-6 h-6" />
                           </div>
                           <h4 className="font-bold text-slate-900 mb-1">{doc.label}</h4>
                           <p className="text-xs text-slate-500 mb-4 h-8">{doc.desc}</p>
                           
                           <div className="flex items-center justify-between mt-4">
                             <span className="text-xs font-bold text-brand-600 uppercase tracking-wider group-hover:underline">Upload</span>
                             <ArrowRight className="w-4 h-4 text-brand-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                           </div>
                           
                           <input 
                             type="file" 
                             disabled={!editable} 
                             className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                             onChange={(e)=>e.target.files && uploadDoc(doc.type, e.target.files[0])} 
                           />
                        </div>
                      ))}
                    </div>

                    {uploading && (
                      <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-brand-50 text-brand-700 animate-pulse">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="font-bold">Uploading secure document...</span>
                      </div>
                    )}

                    {documents.length > 0 && (
                      <div className="mt-8 bg-slate-50 rounded-3xl p-6 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Uploaded Files</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {documents.map((d)=>(
                            <div key={d.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 capitalize">{d.doc_type.replace("_", " ")}</div>
                                  <div className="text-xs text-slate-400 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-emerald-500" /> Uploaded successfully
                                  </div>
                                </div>
                              </div>
                              <a href={d.file_path} target="_blank" rel="noreferrer" className="text-xs font-bold text-brand-600 hover:text-brand-700 px-4 py-2 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
                                View File
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {section === "review" && (
                  <div className="space-y-8 max-w-3xl mx-auto text-center py-10">
                    <div className="w-24 h-24 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/20">
                      <Send className="w-10 h-10 ml-1" />
                    </div>
                    
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ready to Launch?</h2>
                    <p className="text-lg text-slate-500 max-w-lg mx-auto">
                      Please review all your information carefully. Once submitted, your application will be locked for underwriting review.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto mt-8">
                      <button 
                        disabled={saving || !editable} 
                        onClick={submitApplication} 
                        className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-lg shadow-xl shadow-brand-600/30 hover:shadow-brand-600/40 hover:-translate-y-1 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            Submit Application <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => setSection("company")}
                        className="w-full py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 font-bold border border-slate-200 transition-colors"
                      >
                        Review Information
                      </button>
                    </div>

                    {submitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex flex-col items-center gap-2"
                      >
                        <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                        <div className="font-bold text-xl">Application Submitted Successfully!</div>
                        <p className="text-emerald-700">Our team is now reviewing your documents. We will be in touch shortly.</p>
                      </motion.div>
                    )}
                    
                    {error && (
                      <div className="mt-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 flex items-center justify-center gap-2 font-bold">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {/* Floating Save Indicator */}
                <AnimatePresence>
                  {saving && !uploading && section !== "review" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="fixed bottom-8 right-8 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 font-medium border border-white/10"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-brand-500" /> 
                      Saving changes...
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  );
}
