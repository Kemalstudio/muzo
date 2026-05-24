import { create } from 'zustand'

const useHistoryStore = create((set, get) => ({
  history: [],
  historyGrouped: [],
  stats: null,
  loading: false,
  error: null,

  setHistory: (tracks) => set({ history: tracks }),

  setHistoryGrouped: (grouped) => set({ historyGrouped: grouped }),

  setStats: (stats) => set({ stats }),

  addToHistory: (track) => {
    set((state) => ({
      history: [
        {
          track_id: track.id,
          track,
          listened_at: new Date().toISOString(),
        },
        ...state.history.filter((h) => h.track_id !== track.id),
      ],
    }))
  },

  removeFromHistory: (trackId) => {
    set((state) => ({
      history: state.history.filter((h) => h.track_id !== trackId),
    }))
  },

  clearHistory: () => set({ history: [], historyGrouped: [], stats: null }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  getRecentTracks: (limit = 10) => {
    return get()
      .history.slice(0, limit)
      .map((h) => h.track)
      .filter(Boolean)
  },
}))

export default useHistoryStore
