import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useGenre from '../hooks/useGenre'
import usePlayerStore from '../store/usePlayerStore'
import TrackCard from '../components/ui/TrackCard'

export default function Genre() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { genre, loading, error } = useGenre(id)
  const play = usePlayerStore((s) => s.play)

  const genreTracks = useMemo(() => genre?.tracks || [], [genre?.tracks])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
      </div>
    )
  }

  if (error || !genre) {
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
          <p className="text-rose-400">Genre not found or failed to load.</p>
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

      {/* Genre Header */}
      <div className="spotify-hero-card spotify-card">
        {/* Banner Background */}
        <div className="relative h-80 w-full bg-linear-to-br from-cyan-600 to-blue-600">
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>

        {/* Genre Info Overlay */}
        <div className="relative -mt-32 space-y-6 px-8 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-1">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                Genre
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white">{genre.name}</h1>
            {genre.description && (
              <p className="max-w-2xl text-lg text-slate-300">{genre.description}</p>
            )}
          </div>

          {/* Genre Stats */}
          <div className="flex flex-wrap gap-6 border-t border-slate-700 pt-6">
            <div>
              <p className="text-sm text-slate-400">Songs</p>
              <p className="text-3xl font-bold text-white">{genreTracks.length}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Popularity</p>
              <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-linear-to-r from-indigo-600 to-purple-600"
                  style={{ width: `${(genre.popularity || 0) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Tracks Section */}
      {genreTracks.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Popular Tracks</h2>
            <p className="mt-2 text-slate-400">
              {genreTracks.length} tracks in {genre.name} genre
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {genreTracks.slice(0, 9).map((track) => (
              <TrackCard key={track.id} track={track} onPlay={play} />
            ))}
          </div>

            {genreTracks.length > 9 && (
            <div className="flex justify-center pt-6">
              <button className="spotify-btn spotify-btn-secondary px-8 py-3">
                View all {genreTracks.length} songs
              </button>
            </div>
          )}
        </section>
      )}

      {/* Empty State */}
      {genreTracks.length === 0 && (
        <div className="spotify-card p-12 text-center">
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
          <p className="text-slate-400">No tracks in this genre</p>
        </div>
      )}
    </div>
  )
}




