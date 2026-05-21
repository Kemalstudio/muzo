import Button from './Button'

export default function TrendingSongCard({ track, onPlay, rank }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 transition duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
      <div className="flex h-full flex-col p-5">
        {/* Rank Badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600">
            <span className="text-sm font-bold text-white">#{rank}</span>
          </div>
          <svg
            className="h-5 w-5 text-slate-500 opacity-0 transition group-hover:opacity-100"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Track Info */}
        <div className="flex-1">
          <div className="mb-1 text-xs uppercase tracking-[0.32em] text-slate-500">
            Trending
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-indigo-400">
            {track.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{track.artist}</p>
        </div>

        {/* Play Button */}
        <Button
          onClick={() => onPlay(track)}
          className="mt-4 w-full transition duration-300 group-hover:from-indigo-600 group-hover:to-purple-600"
        >
          Play Now
        </Button>
      </div>
    </div>
  )
}
