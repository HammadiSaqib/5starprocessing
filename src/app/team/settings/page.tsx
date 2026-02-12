export default function TeamSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your workspace and preferences.</p>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">General Settings</h2>
        </div>
        <div className="p-6">
          <div className="text-slate-500">Configure agent workspace settings.</div>
        </div>
      </div>
    </div>
  );
}
