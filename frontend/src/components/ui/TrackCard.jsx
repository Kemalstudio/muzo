import Button from './Button'
import TrackActionsMenu from '../playlist/TrackActionsMenu'
import LikeButton from '../favorites/LikeButton'

export default function TrackCard({ track, onPlay }) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5 transition hover:border-indigo-500">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm uppercase tracking-[0.32em] text-slate-500">Track</span>
        <div className="flex items-center gap-2">
          <LikeButton track={track} size="sm" />
          <TrackActionsMenu track={track} />
        </div>
      </div>
      <div className="font-semibold text-white">{track.title}</div>
      <p className="mt-2 text-sm text-slate-400">{track.artist}</p>
      <Button onClick={() => onPlay(track)} className="mt-4">Play</Button>
    </div>
  )
}
