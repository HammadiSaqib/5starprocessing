"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, FileText } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AffiliateModal({ isOpen, onClose, onSuccess }: AffiliateModalProps) {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!accepted) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/affiliate/apply", { method: "POST" });
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return isOpen
    ? createPortal(
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-100 text-brand-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Affiliate Program</h2>
                  <p className="text-sm text-slate-500">Terms & Conditions</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                <p className="lead">
                  Become a partner with Star Processing and earn rewards for referring new merchants.
                </p>
                <h3>1. Program Overview</h3>
                <p>
                  The Affiliate Program allows you to refer businesses to Star Processing. You will receive commissions based on the processing volume of merchants you refer.
                </p>
                <h3>2. Commission Structure</h3>
                <p>
                  Commissions are paid monthly. Specific rates will be provided upon approval of your application.
                </p>
                <h3>3. Responsibilities</h3>
                <p>
                  You agree to promote Star Processing in a professional manner and not to engage in any misleading or unethical marketing practices.
                </p>
                <h3>4. Termination</h3>
                <p>
                  Star Processing reserves the right to terminate your affiliate status at any time for violation of these terms.
                </p>
                <p className="text-xs text-slate-400 mt-8">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-medium">
                  {error}
                </div>
              )}
              
              <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-brand-200 transition-colors">
                <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${accepted ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 bg-slate-50'}`}>
                  {accepted && <CheckCircle className="w-3.5 h-3.5" />}
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <span className="flex-1">
                  <span className="text-sm font-semibold text-slate-900 block">I accept the Terms & Conditions</span>
                  <span className="text-xs text-slate-500 block mt-0.5">I have read and agree to the affiliate program agreement above.</span>
                </span>
              </label>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!accepted || loading}
                  className="px-6 py-2.5 bg-brand-600 text-white font-bold text-sm rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-500/20"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </motion.div>
        </>,
        document.body
      )
    : null;
}
