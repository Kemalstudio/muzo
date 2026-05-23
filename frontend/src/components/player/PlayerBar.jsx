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
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seek(newTime)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="spotify-card rounded-4 border border-slate-800 bg-slate-950/95 p-4 shadow-[0_24px_100px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <div className={`flex flex-col gap-4 ${current ? 'lg:flex-row lg:items-center' : ''}`}>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-600 to-purple-600 shadow-lg shadow-black/50 overflow-hidden">
              {current?.cover ? (
                <img src={current.cover} alt={current.title} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl font-black text-white">M</span>
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.32em] text-secondary mb-1">
                {current ? (isPlaying ? 'Now Playing' : 'Paused') : 'Player'}
              </p>
              <p className="truncate text-lg font-semibold text-white">
                {current?.title || 'Waiting for a track'}
              </p>
              <p className="truncate text-sm text-slate-400">
                {current?.artist || 'Select a song from the dashboard or search'}
              </p>
            </div>
          </div>

          {current && (
            <div className="grid grid-cols-4 gap-2 items-center">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition ${
                  isShuffle
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
                }`}
                title="Shuffle"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                </svg>
              </button>

              <button
                onClick={previous}
                disabled={!current}
                className="p-2 rounded-full bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Previous"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 7.75A3 3 0 008.446 4h8.908a3 3 0 011.06.231m0 7.038a3 3 0 01-1.06.231h-8.908a3 3 0 110-6h.03M15 12.713v5.564a2 2 0 01-1.255 1.821m0-7.564a2 2 0 00-1.255 1.821m0-7.564V4.982a2 2 0 011.255-1.821" />
                </svg>
              </button>

              <button
                onClick={togglePlayPause}
                disabled={!current}
                className="p-3 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition disabled:hover:shadow-none"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.75 1.75A.75.75 0 015 2.5v15a.75.75 0 001.5 0V2.5a.75.75 0 00-.75-.75zm8.5 0a.75.75 0 00-.75.75v15a.75.75 0 001.5 0V2.5a.75.75 0 00-.75-.75z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                )}
              </button>

              <button
                onClick={next}
                disabled={!current}
                className="p-2 rounded-full bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                title="Next"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15.445 7.75A3 3 0 0011.554 4H2.646a3 3 0 00-1.06.231m0 7.038a3 3 0 001.06.231h8.908a3 3 0 110-6h-.03M5 12.713v5.564a2 2 0 001.255 1.821m0-7.564a2 2 0 011.255 1.821m0-7.564V4.982a2 2 0 00-1.255-1.821" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const modes = ['off', 'all', 'one']
                  const currentIdx = modes.indexOf(repeatMode)
                  const nextMode = modes[(currentIdx + 1) % modes.length]
                  setRepeatMode(nextMode)
                }}
                className={`p-2 rounded-full transition text-sm font-semibold ${
                  repeatMode !== 'off'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
                }`}
                title={`Repeat: ${repeatMode}`}
              >
                {repeatMode === 'one' ? '↻1' : '↻'}
              </button>
            </div>
          )}

          {current && (
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="p-2 rounded-full bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                title="Volume"
              >
                {isMuted || volume === 0 ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.172a1 1 0 011.414 0A6.972 6.972 0 0118 10a6.972 6.972 0 01-1.929 4.913 1 1 0 01-1.414-1.414A4.972 4.972 0 0016 10c0-1.369-.474-2.631-1.257-3.627a1 1 0 010-1.414z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM13.768 5.812a1 1 0 011.414 0A4 4 0 0117 10a4 4 0 01-1.818 3.188 1 1 0 01-1.414-1.414A2 2 0 0015 10a2 2 0 00-.818-1.588 1 1 0 010-1.414z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.172a1 1 0 011.414 0A6.972 6.972 0 0118 10a6.972 6.972 0 01-1.929 4.913 1 1 0 01-1.414-1.414A4.972 4.972 0 0016 10c0-1.369-.474-2.631-1.257-3.627a1 1 0 010-1.414z" />
                  </svg>
                )}
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-12 right-0 bg-slate-900 border border-slate-700 rounded-4 p-3 z-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-24 h-1 accent-indigo-500 bg-slate-700 rounded-full"
                    />
                    <button
                      onClick={toggleMute}
                      className="rounded-full bg-slate-800/80 px-3 py-2 text-xs font-semibold text-white"
                    >
                      {isMuted || volume === 0 ? 'Mute' : `${Math.round(volume * 100)}%`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {current ? (
          <div className="mt-4 flex items-center gap-3 px-1">
            <span className="text-xs text-slate-500 w-10 text-right">{formatTime(currentTime)}</span>
            <div
              onClick={handleProgressClick}
              className="group relative flex-1 h-2 rounded-full bg-slate-800 cursor-pointer hover:bg-slate-700"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-indigo-600 to-purple-600"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 rounded-full bg-white shadow-lg transition-transform duration-200"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <span className="text-xs text-slate-500 w-10 text-left">{formatTime(duration)}</span>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm uppercase tracking-[0.32em] text-secondary mb-2">Player</p>
            <h3 className="text-lg font-semibold text-white">No track selected</h3>
            <p className="mt-2 text-sm text-slate-400">
              Pick a song from the dashboard, playlists or search to start listening.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

