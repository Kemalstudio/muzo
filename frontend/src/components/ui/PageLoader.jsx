export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-slate-900/95 px-10 py-8 text-center shadow-2xl shadow-black/40">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500"></div>
        <div>
          <p className="text-lg font-semibold text-white">Loading page...</p>
          <p className="text-sm text-slate-400">Preparing your MUZO experience.</p>
        </div>
      </div>
    </div>
  )
}




