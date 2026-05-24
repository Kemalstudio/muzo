import { create } from 'zustand'

const usePlayerStore = create((set, get) => ({
  // Queue and track management
  queue: [],
  currentIndex: -1,
  current: null,

  // Playback state
  isPlaying: false,
  currentTime: 0,
  duration: 0,

  // Player settings
  volume: 1,
  isMuted: false,
  repeatMode: 'off', // off, one, all
  isShuffle: false,

  // Actions
  setQueue: (tracks) => set({ queue: tracks }),
  
  play: (track) => {
    const { queue } = get()
    const newQueue = Array.isArray(track) ? track : [track]
    const index = 0
    set({
      queue: newQueue,
      current: newQueue[index],
      currentIndex: index,
      isPlaying: true,
    })
  },

  playTrack: (track) => {
    set({ current: track, isPlaying: true })
  },

  pause: () => set({ isPlaying: false }),

  resume: () => set({ isPlaying: true }),

  togglePlayPause: () =>
    set((state) => ({ isPlaying: !state.isPlaying })),

  next: () => {
    const { queue, currentIndex, isShuffle, repeatMode } = get()
    if (queue.length === 0) return

    let nextIndex
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else {
      nextIndex = (currentIndex + 1) % queue.length
    }

    set({
      current: queue[nextIndex],
      currentIndex: nextIndex,
      isPlaying: true,
    })
  },

  previous: () => {
    const { queue, currentIndex, currentTime } = get()
    if (queue.length === 0) return

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      set({ currentTime: 0 })
      return
    }

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1
    set({
      current: queue[prevIndex],
      currentIndex: prevIndex,
      isPlaying: true,
    })
  },

  stop: () =>
    set({
      current: null,
      currentIndex: -1,
      isPlaying: false,
      currentTime: 0,
    }),

  seek: (time) => set({ currentTime: time }),

  setCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  toggleMute: () =>
    set((state) => ({ isMuted: !state.isMuted })),

  setRepeatMode: (mode) => set({ repeatMode: mode }),

  toggleShuffle: () =>
    set((state) => ({ isShuffle: !state.isShuffle })),

  setIsPlaying: (isPlaying) => set({ isPlaying }),
}))

export default usePlayerStore
