import { useMemo } from 'react'
import useTracks from '../hooks/useTracks'
import usePlayerStore from '../store/usePlayerStore'
import SectionHeading from '../components/ui/SectionHeading'
import TrackCard from '../components/ui/TrackCard'

export default function Home() {
  const { tracks, loading, error } = useTracks()
  const play = usePlayerStore((s) => s.play)

  const trackList = useMemo(() => tracks || [], [tracks])

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Discover new music"
        subtitle="Browse trending tracks and add them to your queue."
      />

      {loading ? (
        <div className="text-slate-400">Loading tracks...</div>
      ) : error ? (
        <div className="text-rose-400">Unable to load tracks.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {trackList.map((track) => (
            <TrackCard key={track.id} track={track} onPlay={play} />
          ))}
        </div>
      )}
    </div>
  )
}
