import { useState, useEffect, useRef } from 'react'
import usePlayerStore from '../../store/usePlayerStore'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import useRecordPlay from '../../hooks/useRecordPlay'

export default function PlayerBar() {
  useAudioPlayer()
  const { recordPlayback } = useRecordPlay()
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const recordedTrackIdRef = useRef(null)

  const {
    current,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffle,
    togglePlayPause,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    setRepeatMode,
    toggleShuffle,
  } = usePlayerStore()

  useEffect(() => {
    if (current && isPlaying && recordedTrackIdRef.current !== current.id) {
      recordedTrackIdRef.current = current.id
      recordPlayback(current)
    }
  }, [current, isPlaying, recordPlayback])

  const formatTime = (seconds) => {
    if (!seconds || !isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  const handleProgressClick = (e) => {
    if (!duration) return
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const newTime = percent * duration
    seek(newTime)
  }

  return (
    <div className="player-bar glass-panel-strong p-4">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_2fr_1fr] items-center">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative h-16 w-16 rounded-[1.75rem] overflow-hidden bg-linear-to-br from-indigo-600 to-purple-600 shadow-glow">
            {current?.cover ? (
              <img src={current.cover} alt={current.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-black text-white">M</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400 mb-1">
              {current ? (isPlaying ? 'Now playing' : 'Paused') : 'Ready to listen'}
            </p>
            <p className="truncate text-lg font-semibold text-white">
              {current?.title || 'Select a track'}
            </p>
            <p className="truncate text-sm text-slate-400">
              {current?.artist || 'Browse playlists or search for music'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={toggleShuffle}
              className={`icon-button ${isShuffle ? 'bg-indigo-600 text-white' : 'bg-slate-900/70 text-slate-300'}`}
              title="Shuffle"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5h5.25c1.08 0 2.1.36 2.94 1.02l1.83 1.5" />
                <path d="M21 7.5v-3l-3 3 3 3V9.5" />
                <path d="M3 19.5h5.25c1.08 0 2.1-.36 2.94-1.02l1.83-1.5" />
                <path d="M21 16.5v3l-3-3 3-3v1.5" />
                <path d="M12.75 7.5l4.5 4.5-4.5 4.5" />
              </svg>
            </button>
            <button
              onClick={previous}
              disabled={!current}
              className="icon-button disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 18V6l-8 6 8 6z" />
              </svg>
            </button>
            <button
              onClick={togglePlayPause}
              disabled={!current}
              className="icon-button bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M9 5h2v14H9zm4 0h2v14h-2z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              )}
            </button>
            <button
              onClick={next}
              disabled={!current}
              className="icon-button disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 18V6l8 6-8 6z" />
              </svg>
            </button>
            <button
              onClick={() => {
                const modes = ['off', 'all', 'one']
                const currentIdx = modes.indexOf(repeatMode)
                const nextMode = modes[(currentIdx + 1) % modes.length]
                setRepeatMode(nextMode)
              }}
              className={`icon-button ${repeatMode !== 'off' ? 'bg-indigo-600 text-white' : 'bg-slate-900/70 text-slate-300'}`}
              title={`Repeat: ${repeatMode}`}
            >
              {repeatMode === 'one' ? '1' : '↻'}
            </button>
          </div>

          <div className="hidden justify-center gap-1 lg:flex music-wave">
            <span style={{ height: '24px' }} />
            <span style={{ height: '16px' }} />
            <span style={{ height: '28px' }} />
            <span style={{ height: '18px' }} />
            <span style={{ height: '22px' }} />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end justify-end">
          {current ? (
            <>
              <div className="w-full">
                <div className="relative h-2 rounded-full bg-slate-900/80 cursor-pointer" onClick={handleProgressClick}>
                  <div className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-indigo-500 to-purple-500" style={{ width: `${progress}%` }} />
                  <div
                    className="progress-handle absolute top-1/2 h-3 w-3 rounded-full bg-white shadow-lg"
                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
              </div>
              <div className="flex w-full justify-between text-xs text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </>
          ) : (
            <div className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 text-center text-sm text-slate-400">
              Pick a track from the dashboard, playlists, or search to begin the immersive playback experience.
            </div>
          )}

          {current && (
            <div className="relative w-full flex justify-end">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="icon-button"
                title="Volume"
              >
                {isMuted || volume === 0 ? '🔇' : `${Math.round(volume * 100)}%`}
              </button>
              {showVolumeSlider && (
                <div className="absolute bottom-14 right-0 w-44 rounded-[1.75rem] border border-white/10 bg-slate-950/95 p-3 shadow-glow backdrop-blur-xl">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 rounded-full accent-indigo-500 bg-slate-800"
                  />
                  <button
                    onClick={toggleMute}
                    className="mt-3 w-full rounded-full bg-slate-900/80 px-3 py-2 text-xs font-semibold text-white"
                  >
                    {isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}





