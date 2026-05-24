import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useHistoryData from '../hooks/useHistoryData'
import usePlayerStore from '../store/usePlayerStore'
import LikeButton from '../components/favorites/LikeButton'
import { clearHistory } from '../services/historyService'

export default function History() {
  const navigate = useNavigate()
  const { historyGrouped, stats, loading, error } = useHistoryData()
  const play = usePlayerStore((s) => s.play)

  const formatDuration = (seconds) => {
    if (!seconds) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalDuration = useMemo(() => {
    let total = 0
    historyGrouped.forEach((group) => {
      group.tracks?.forEach((item) => {
        total += item.track?.duration || 0
      })
    })
    const hours = Math.floor(total / 3600)
    const mins = Math.floor((total % 3600) / 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }, [historyGrouped])

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your play history?')) {
      try {
        await clearHistory()
        window.location.reload()
      } catch (err) {
        console.error('Failed to clear history:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-white">Recently Played</h1>
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8">
          <p className="text-rose-400">Error loading history: {error}</p>
        </div>
      </div>
    )
  }

  const allTracks = historyGrouped
    .flatMap((group) => group.tracks || [])
    .map((item) => item.track)
    .filter(Boolean)

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Recently Played</h1>
          <p className="text-slate-400">
            {stats?.unique_tracks || 0} unique songs • {stats?.total_plays || 0}{' '}
            plays
          </p>
        </div>
        {allTracks.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-rose-600 hover:bg-rose-600/10 hover:text-rose-400"
          >
            <svg
              className="mb-1 inline-block h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear History
          </button>
        )}
      </div>

      {/* Stats Card */}
      {stats && allTracks.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="spotify-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Plays
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {stats.total_plays}
            </p>
          </div>
          <div className="spotify-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Unique Songs
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {stats.unique_tracks}
            </p>
          </div>
          <div className="spotify-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Top Track
            </p>
            <p className="mt-2 line-clamp-2 text-sm font-semibold text-white">
              {stats.top_track?.title || '—'}
            </p>
            <p className="text-xs text-slate-400">
              {stats.top_track_plays} plays
            </p>
          </div>
        </div>
      )}

      {/* Grouped History */}
      {historyGrouped.length > 0 ? (
        <div className="space-y-8">
          {historyGrouped.map((group, groupIdx) => (
            <section key={groupIdx} className="space-y-4">
              {/* Date Header */}
              <h2 className="text-xl font-bold text-white">{group.day_label}</h2>

              {/* Tracks */}
              <div className="space-y-2">
                {group.tracks?.map((item, trackIdx) => {
                  const track = item.track
                  if (!track) return null

                    return (
                    <div
                      key={`${group.date}-${track.id}-${trackIdx}`}
                      className="spotify-list-item group grid grid-cols-1 lg:grid-cols-[50px_1fr_250px_100px_120px] gap-4 rounded-lg border border-slate-700/40 bg-slate-950/40 p-4 transition hover:border-slate-600 hover:bg-slate-900/60"
                    >
                      {/* Track Number */}
                      <div className="hidden lg:flex items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          {trackIdx + 1}
                        </span>
                      </div>

                      {/* Song Title */}
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-slate-800">
                          <svg
                            className="h-5 w-5 text-slate-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-slate-300">
                            {track.title}
                          </h4>
                          <p className="lg:hidden text-sm text-slate-400">
                            {track.artist?.name || 'Unknown Artist'}
                          </p>
                        </div>
                      </div>

                      {/* Artist */}
                      <div className="hidden lg:flex items-center">
                        <button
                          onClick={() => navigate(`/artist/${track.artist?.id}`)}
                          className="text-sm text-slate-400 hover:text-slate-300 transition"
                        >
                          {track.artist?.name || 'Unknown Artist'}
                        </button>
                      </div>

                      {/* Duration */}
                      <div className="hidden lg:flex items-center justify-end">
                        <span className="text-sm text-slate-400">
                          {formatDuration(track.duration)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 justify-end lg:justify-start">
                        <button
                          onClick={() => play(track)}
                          className="rounded-full p-2 transition hover:bg-indigo-600"
                        >
                          <svg
                            className="h-5 w-5 text-indigo-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </button>
                        <LikeButton track={track} size="md" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="spotify-card p-16 text-center">
          <svg
            className="mx-auto mb-6 h-20 w-20 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-white">
            No Play History
          </h3>
          <p className="text-slate-400">Start playing songs to build your history</p>
        </div>
      )}
    </div>
  )
}




