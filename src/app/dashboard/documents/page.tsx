"use client";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

export default function DocumentsPage() {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  return (
    <motion.div
      key="documents"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-brand-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Documents Repository</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Securely upload and manage your business documents here. All files are encrypted.
        </p>
        <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20">
          Upload Document
        </button>
      </div>
    </motion.div>
  );
}
