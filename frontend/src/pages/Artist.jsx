import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useArtist from '../hooks/useArtist'
import usePlayerStore from '../store/usePlayerStore'
import TrackCard from '../components/ui/TrackCard'
import Button from '../components/ui/Button'

export default function Artist() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { artist, loading, error } = useArtist(id)
  const play = usePlayerStore((s) => s.play)

  const artistSongs = useMemo(() => artist?.tracks || [], [artist?.tracks])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
      </div>
    )
  }

  if (error || !artist) {
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
          <p className="text-rose-400">Artist not found or failed to load.</p>
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

      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700">
        {/* Banner Background */}
        <div className="relative h-64 w-full bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>

        {/* Artist Info Overlay */}
        <div className="relative -mt-24 space-y-6 px-8 pb-8">
          {/* Avatar */}
          <div className="flex items-end gap-6">
            <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-4 border-slate-950 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl shadow-black/50">
              <svg className="h-24 w-24 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            {/* Artist Details */}
            <div className="flex-1 pb-4">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-1">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                  Artist
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white">{artist.name}</h1>
              {artist.bio && (
                <p className="mt-4 max-w-2xl text-slate-300">{artist.bio}</p>
              )}
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-wrap items-center gap-6 border-t border-slate-800 pt-6">
            {/* Monthly Listeners */}
            <div>
              <p className="text-sm text-slate-400">Monthly Listeners</p>
              <p className="text-3xl font-bold text-white">
                {artist.monthly_listeners
                  ? (artist.monthly_listeners / 1000000).toFixed(1) + 'M'
                  : 'N/A'}
              </p>
            </div>

            {/* Followers */}
            <div>
              <p className="text-sm text-slate-400">Followers</p>
              <p className="text-3xl font-bold text-white">
                {artist.followers_count
                  ? (artist.followers_count / 1000).toFixed(1) + 'K'
                  : 'N/A'}
              </p>
            </div>

            {/* Songs Count */}
            <div>
              <p className="text-sm text-slate-400">Songs</p>
              <p className="text-3xl font-bold text-white">{artistSongs.length}</p>
            </div>

            {/* Actions */}
            <div className="ml-auto flex gap-3">
              <Button className="transition duration-300 hover:from-indigo-600 hover:to-purple-600">
                Follow
              </Button>
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
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Songs Section */}
      {artistSongs.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Popular Songs</h2>
            <p className="mt-2 text-slate-400">
              {artistSongs.length} tracks from {artist.name}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artistSongs.slice(0, 6).map((track) => (
              <TrackCard key={track.id} track={track} onPlay={play} />
            ))}
          </div>

          {artistSongs.length > 6 && (
            <div className="flex justify-center pt-6">
              <button className="rounded-full border border-indigo-600 px-8 py-3 font-semibold text-indigo-400 transition hover:bg-indigo-600/10">
                View all {artistSongs.length} songs
              </button>
            </div>
          )}
        </section>
      )}

      {/* All Songs Grid */}
      {artistSongs.length > 6 && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">All Songs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artistSongs.slice(6).map((track) => (
              <TrackCard key={track.id} track={track} onPlay={play} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {artistSongs.length === 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-slate-600"
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
          <p className="text-slate-400">No songs available for this artist</p>
        </div>
      )}
    </div>
  )
}
