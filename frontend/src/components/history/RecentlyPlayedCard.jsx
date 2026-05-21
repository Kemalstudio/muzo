export default function RecentlyPlayedCard({ track, onPlay }) {
  if (!track) return null

  return (
    <div className="group rounded-2xl border border-slate-700 bg-slate-950 p-4 transition hover:border-slate-600 hover:bg-slate-900">
      {/* Album Art */}
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="flex items-center justify-center h-full">
          <svg
            className="h-10 w-10 text-slate-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>

        {/* Play Button Overlay */}
        <button
          onClick={() => onPlay(track)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/50"
        >
          <svg className="h-8 w-8 text-white opacity-0 transition group-hover:opacity-100">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Track Info */}
      <h4 className="line-clamp-2 font-semibold text-white group-hover:text-slate-300">
        {track.title}
      </h4>
      <p className="mt-1 line-clamp-1 text-xs text-slate-400">
        {track.artist?.name || 'Unknown Artist'}
      </p>
    </div>
  )
}
