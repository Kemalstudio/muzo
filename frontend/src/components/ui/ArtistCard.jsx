import { Link } from 'react-router-dom'
import Button from './Button'

export default function ArtistCard({ artist, onPlay }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="group rounded-3xl border border-slate-700 bg-linear-to-br from-slate-900 to-slate-950 p-6 transition duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
        {/* Artist Avatar Placeholder */}
        <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600">
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-16 w-16 text-white/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Artist Info */}
        <div className="mb-4">
          <div className="mb-1 text-xs uppercase tracking-[0.32em] text-slate-500">
            Artist
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400">
            {artist.name}
          </h3>
          {artist.bio && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">
              {artist.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="mb-4 flex gap-4 text-sm text-slate-400">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-500">
              Followers
            </div>
            <div className="text-lg font-semibold text-white">
              {artist.followers_count || 0}
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <Button className="w-full transition duration-300 group-hover:from-indigo-600 group-hover:to-purple-600">
          Follow
        </Button>
      </div>
    </Link>
  )
}
