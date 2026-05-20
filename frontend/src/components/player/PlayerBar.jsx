import usePlayerStore from '../store/usePlayerStore'

export default function PlayerBar() {
  const current = usePlayerStore((s) => s.current)

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-950/95 px-5 py-4 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-slate-800 text-2xl text-white">
          {current ? '♫' : 'M'}
        </div>
        <div>
          <p className="text-sm text-slate-400">{current ? 'Now Playing' : 'No track selected'}</p>
          <p className="text-lg font-semibold text-white">{current?.title ?? 'Select a song to start'}</p>
          <p className="text-sm text-slate-500">{current?.artist ?? 'Browse your library or discover new music'}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">◀</button>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">▶ Play</button>
          <button className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">▶</button>
        </div>
        <div className="hidden text-sm text-slate-400 md:block">Premium sound by MUZO</div>
      </div>
    </div>
  )
}
