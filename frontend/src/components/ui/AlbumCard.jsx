import { Link } from 'react-router-dom'
import Button from './Button'

export default function AlbumCard({ album, onPlay }) {
  const trackCount = album.tracks?.length || 0

  return (
    <Link to={`/album/${album.id}`}>
      <div className="group rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
        {/* Album Cover Placeholder */}
        <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-red-600">
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
                d="M14.828 14.828a4 4 0 01-5.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Album Info */}
        <div className="mb-4">
          <div className="mb-1 text-xs uppercase tracking-[0.32em] text-slate-500">
            Album
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400">
            {album.name}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{album.artist}</p>
        </div>

        {/* Track Count & Year */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {trackCount} {trackCount === 1 ? 'Song' : 'Songs'}
          </span>
          {album.release_date && (
            <span className="text-xs font-semibold text-indigo-400">
              {new Date(album.release_date).getFullYear()}
            </span>
          )}
        </div>

        {/* Play Button */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            onPlay?.(album)
          }}
          className="w-full transition duration-300 group-hover:from-indigo-600 group-hover:to-purple-600"
        >
          Play
        </Button>
      </div>
    </Link>
  )
}
