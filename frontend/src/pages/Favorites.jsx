import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'
import usePlayerStore from '../store/usePlayerStore'
import LikeButton from '../components/favorites/LikeButton'
import useFavoritesStore from '../store/useFavoritesStore'

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, loading, error } = useFavorites()
  const play = usePlayerStore((s) => s.play)
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite)
  const [sortBy, setSortBy] = useState('recent') // 'recent', 'title', 'artist'

  const sortedFavorites = useMemo(() => {
    const sorted = [...favorites]
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'artist':
        return sorted.sort((a, b) =>
          (a.artist?.name || '').localeCompare(b.artist?.name || '')
        )
      case 'recent':
      default:
        return sorted
    }
  }, [favorites, sortBy])

  const formatDuration = (seconds) => {
    if (!seconds) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalDuration = useMemo(() => {
    const total = favorites.reduce((sum, track) => sum + (track.duration || 0), 0)
    const hours = Math.floor(total / 3600)
    const mins = Math.floor((total % 3600) / 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }, [favorites])

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
        <h1 className="text-4xl font-bold text-white">Liked Songs</h1>
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8">
          <p className="text-rose-400">Error loading favorites: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Liked Songs</h1>
        <p className="text-slate-400">
          {favorites.length} song{favorites.length !== 1 ? 's' : ''} •{' '}
          {totalDuration}
        </p>
      </div>

      {/* Hero Section with Controls */}
      {favorites.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-700">
          {/* Gradient Background */}
          <div className="relative h-40 w-full bg-gradient-to-br from-rose-600 via-rose-600 to-pink-600">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative -mt-32 space-y-6 px-8 pb-8">
            {/* Title */}
            <div className="flex items-end gap-6">
              {/* Icon */}
              <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-slate-950 bg-gradient-to-br from-rose-600 to-pink-600 shadow-2xl shadow-black/50">
                <div className="flex h-full items-center justify-center">
                  <svg
                    className="h-20 w-20 text-white/60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pb-4">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/50 bg-rose-500/10 px-4 py-1">
                  <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-rose-300">
                    Liked Songs
                  </span>
                </div>
                <h2 className="text-5xl font-black text-white">Liked Songs</h2>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-300">
                  <span className="font-semibold">{favorites.length} songs</span>
                  <span>•</span>
                  <span>{totalDuration}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
              <button
                onClick={() => {
                  if (favorites.length > 0) {
                    play(favorites)
                  }
                }}
                className="rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-rose-600/50"
              >
                <svg
                  className="mr-2 inline-block h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Play All
              </button>
              <button className="rounded-full border border-slate-700 bg-slate-900/50 p-3 transition hover:border-rose-500 hover:bg-slate-800">
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
      )}

      {/* Sort Controls */}
      {favorites.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-white transition hover:border-slate-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title (A-Z)</option>
            <option value="artist">Artist (A-Z)</option>
          </select>
        </div>
      )}

      {/* Songs Table */}
      {sortedFavorites.length > 0 ? (
        <div className="space-y-2">
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-[50px_1fr_250px_100px_60px] gap-4 px-4 py-3 border-b border-slate-700">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              #
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Title
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Artist
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Duration
            </div>
            <div></div>
          </div>

          {/* Tracks */}
          {sortedFavorites.map((track, index) => (
            <div
              key={track.id}
              className="group grid grid-cols-1 lg:grid-cols-[50px_1fr_250px_100px_60px] gap-4 rounded-lg border border-slate-700/40 bg-slate-950/40 p-4 transition hover:border-rose-500 hover:bg-slate-900/60"
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
                  <h4 className="font-semibold text-white group-hover:text-rose-400">
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
                  className="text-sm text-slate-400 hover:text-rose-400 transition"
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
              <div className="flex items-center gap-2 justify-end lg:justify-center">
                <button
                  onClick={() => play(track)}
                  className="rounded-full p-2 transition hover:bg-rose-600/30 text-rose-400 hover:text-rose-300"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
                <LikeButton track={track} size="md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="mb-2 text-2xl font-bold text-white">No Liked Songs</h3>
          <p className="text-slate-400">
            Start liking songs to build your collection
          </p>
        </div>
      )}
    </div>
  )
}
