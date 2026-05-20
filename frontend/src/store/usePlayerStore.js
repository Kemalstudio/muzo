import create from 'zustand'

const usePlayerStore = create((set) => ({
  tracks: [],
  current: null,
  setTracks: (tracks) => set({ tracks }),
  play: (track) => set({ current: track }),
  stop: () => set({ current: null }),
}))

export default usePlayerStore
