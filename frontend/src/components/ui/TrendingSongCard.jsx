import Button from './Button'
import LikeButton from '../favorites/LikeButton'

export default function TrendingSongCard({ track, onPlay, rank }) {
  return (
    <div className="bg-[#121216] border border-white/[0.04] p-5 rounded-[2rem] hover:border-white/[0.08] transition duration-300 flex flex-col justify-between h-52 group">
      <div>
        <div className="flex justify-between items-start">
          <span className="bg-[#2362F6] text-[10px] font-bold text-white py-1 px-2.5 rounded-full">
            #{rank}
          </span>
          <LikeButton track={track} size="sm" />
        </div>
        <h3 className="font-bold text-sm text-white truncate mt-4 group-hover:text-[#2362F6] transition">{track.title}</h3>
        <p className="text-xs text-slate-500 truncate mt-0.5">{track.artist}</p>
      </div>
      <Button
        onClick={() => onPlay(track)}
        className="w-full bg-[#2362F6] group-hover:bg-white group-hover:text-black hover:scale-105 transition"
      >
        Play Now
      </Button>
    </div>
  )
}