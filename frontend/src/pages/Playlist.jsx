import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import usePlaylist from '../hooks/usePlaylist'
import usePlayerStore from '../store/usePlayerStore'
import Button from '../components/ui/Button'

export default function Playlist() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { playlist, loading, error } = usePlaylist(id)
  const play = usePlayerStore((s) => s.play)

  const playlistTracks = useMemo(() => playlist?.tracks || [], [playlist?.tracks])

  const formatDuration = (seconds) => {
    if (!seconds) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
      </div>
    )
  }

  if (error || !playlist) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8">
          <p className="text-rose-400">Playlist not found or failed to load.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 transition hover:text-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Playlist Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700">
        {/* Gradient Background */}
        <div className="relative h-80 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        {/* Playlist Info Overlay */}
        <div className="relative -mt-40 space-y-6 px-8 pb-8">
          {/* Playlist Cover & Details */}
          <div className="flex items-end gap-8">
            {/* Cover Art */}
            <div className="h-56 w-56 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-slate-950 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-black/50">
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-24 w-24 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pb-4">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-1">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                  Playlist
                </span>
              </div>
              <h1 className="text-6xl font-black text-white">{playlist.name}</h1>
              {playlist.description && (
                <p className="mt-4 text-lg text-slate-200">{playlist.description}</p>
              )}
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-300">
                <span className="font-semibold">{playlistTracks.length} songs</span>
                {playlist.created_at && (
                  <>
                    <span>•</span>
                    <span>Created {new Date(playlist.created_at).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
            <Button
              onClick={() => {
                if (playlistTracks.length > 0) {
                  play(playlistTracks[0])
                }
              }}
              className="transition duration-300 hover:from-indigo-600 hover:to-purple-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </Button>
            <button className="rounded-full border border-slate-700 bg-slate-900/50 p-3 transition hover:border-indigo-500 hover:bg-slate-800">
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
            <button className="rounded-full border border-slate-700 bg-slate-900/50 p-3 transition hover:border-indigo-500 hover:bg-slate-800">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Songs Table Section */}
      {playlistTracks.length > 0 && (
        <section className="space-y-4">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[50px_1fr_250px_100px_60px] gap-4 px-4 py-3 border-b border-slate-700">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">#</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Title</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Artist</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</div>
            <div></div>
          </div>

          {/* Songs List */}
          <div className="space-y-2">
            {playlistTracks.map((track, index) => (
              <div
                key={track.id}
                className="group grid grid-cols-1 lg:grid-cols-[50px_1fr_250px_100px_60px] gap-4 rounded-lg border border-slate-700/40 bg-slate-950/40 p-4 transition hover:border-indigo-500 hover:bg-slate-900/60"
              >
                {/* Track Number */}
                <div className="hidden lg:flex items-center">
                  <span className="text-sm font-semibold text-slate-400">
                    {index + 1}
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
                    <h4 className="font-semibold text-white group-hover:text-indigo-400">
                      {track.title}
                    </h4>
                    <p className="lg:hidden text-sm text-slate-400">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Artist */}
                <div className="hidden lg:flex items-center">
                  <p className="text-sm text-slate-400">{track.artist}</p>
                </div>

                {/* Duration */}
                <div className="hidden lg:flex items-center justify-end">
                  <span className="text-sm text-slate-400">
                    {formatDuration(track.duration)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end lg:justify-center">
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
                  <button className="rounded-full p-2 transition hover:bg-slate-700">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/50 p-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Songs
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {playlistTracks.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Duration
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {(() => {
                    const total = playlistTracks.reduce(
                      (sum, track) => sum + (track.duration || 0),
                      0
                    )
                    const hours = Math.floor(total / 3600)
                    const mins = Math.floor((total % 3600) / 60)
                    return hours > 0
                      ? `${hours}h ${mins}m`
                      : `${mins}m`
                  })()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Average Duration
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {(() => {
                    const avg = Math.round(
                      playlistTracks.reduce((sum, track) => sum + (track.duration || 0), 0) /
                      playlistTracks.length
                    )
                    const mins = Math.floor(avg / 60)
                    const secs = avg % 60
                    return `${mins}:${secs.toString().padStart(2, '0')}`
                  })()}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Last Updated
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  {new Date(playlist.updated_at || playlist.created_at).toLocaleDateString(
                    'en-US',
                    { month: 'short', day: 'numeric' }
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {playlistTracks.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-16 text-center">
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
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-white">
            This playlist is empty
          </h3>
          <p className="text-slate-400">
            Add songs to get started with this playlist
          </p>
        </div>
      )}
    </div>
  )
}
