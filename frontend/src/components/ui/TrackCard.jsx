import Button from './Button'

export default function TrackCard({ track, onPlay }) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5 transition hover:border-indigo-500">
      <div className="mb-2 text-sm uppercase tracking-[0.32em] text-slate-500">Track</div>
      <div className="font-semibold text-white">{track.title}</div>
      <p className="mt-2 text-sm text-slate-400">{track.artist}</p>
      <Button onClick={() => onPlay(track)} className="mt-4">Play</Button>
    </div>
  )
}
