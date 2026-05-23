import { Link } from 'react-router-dom'
import Button from './Button'

export default function PlaylistCard({ playlist, onPlay }) {
  const trackCount = playlist.tracks?.length || 0

  return (
    <Link to={`/playlist/${playlist.id}`}>
      <div className="group relative rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 to-slate-950 p-6 transition duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
        {/* Playlist Image Placeholder */}
        <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600">
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-16 w-16 text-white/60"
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

        {/* Playlist Info */}
        <div className="mb-4">
          <div className="mb-1 text-xs uppercase tracking-[0.32em] text-slate-500">
            Playlist
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400">
            {playlist.name}
          </h3>
          {playlist.description && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">
              {playlist.description}
            </p>
          )}
        </div>

        {/* Track Count */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {trackCount} {trackCount === 1 ? 'Song' : 'Songs'}
          </span>
          <span className="text-xs font-semibold text-indigo-400">
            Curated
          </span>
        </div>

        {/* Play Button */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            onPlay?.(playlist)
          }}
          className="w-full transition duration-300 group-hover:from-indigo-600 group-hover:to-purple-600"
        >
          Play
        </Button>
      </div>
    </Link>
  )
}
