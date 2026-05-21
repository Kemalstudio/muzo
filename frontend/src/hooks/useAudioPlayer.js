import { useEffect, useRef } from 'react'
import usePlayerStore from '../store/usePlayerStore'

export default function useAudioPlayer() {
  const audioRef = useRef(null)
  const {
    current,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    repeatMode,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    next,
  } = usePlayerStore((state) => ({
    current: state.current,
    isPlaying: state.isPlaying,
    volume: state.volume,
    isMuted: state.isMuted,
    currentTime: state.currentTime,
    repeatMode: state.repeatMode,
    setCurrentTime: state.setCurrentTime,
    setDuration: state.setDuration,
    setIsPlaying: state.setIsPlaying,
    next: state.next,
  }))

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    // Event handlers
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
      } else {
        next()
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [setCurrentTime, setDuration, setIsPlaying, next, repeatMode])

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (current) {
      // Create a mock audio URL - in production this would be from your API
      const audioUrl = current.audioUrl || `data:audio/mp3;base64,`
      audio.src = audioUrl
      
      if (isPlaying) {
        audio.play().catch((err) => {
          console.log('Audio playback failed:', err)
        })
      }
    } else {
      audio.pause()
    }
  }, [current, isPlaying])

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && audio.src) {
      audio.play().catch((err) => {
        console.log('Audio playback failed:', err)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Handle volume
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Handle seek
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audio.src) return
    if (Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime
    }
  }, [currentTime])

  return audioRef
}
