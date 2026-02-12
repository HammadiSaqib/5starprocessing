export default function DisqualifiedPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900/60 border border-white/10 rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">Not Eligible</h1>
        <p className="text-slate-400 mb-6">
          Based on your answers, you are not eligible to apply through the 5‑Star Portal at this time.
        </p>
        <p className="text-slate-400">
          For questions, please contact our team. We will review and advise the best path forward.
        </p>
      </div>
    </main>
  );
}
