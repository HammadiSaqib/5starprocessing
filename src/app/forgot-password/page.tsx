export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-2">Forgot password</h1>
        <p className="text-slate-600 text-sm mb-6">
          Enter your email to receive password reset instructions.
        </p>
        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              className="mt-2 block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              placeholder="name@company.com"
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Send reset link
          </button>
        </form>
      </div>
    </main>
  );
}
