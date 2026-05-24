import { create } from 'zustand'

const useFavoritesStore = create((set, get) => ({
  favorites: [],
  favoriteTrackIds: new Set(),
  loading: false,
  error: null,
  count: 0,

  setFavorites: (tracks) => {
    const ids = new Set(tracks.map((t) => t.id))
    set({
      favorites: tracks,
      favoriteTrackIds: ids,
    })
  },

  addFavorite: (track) => {
    set((state) => {
      const newIds = new Set(state.favoriteTrackIds)
      newIds.add(track.id)
      return {
        favorites: [track, ...state.favorites],
        favoriteTrackIds: newIds,
        count: state.count + 1,
      }
    })
  },

  removeFavorite: (trackId) => {
    set((state) => {
      const newIds = new Set(state.favoriteTrackIds)
      newIds.delete(trackId)
      return {
        favorites: state.favorites.filter((t) => t.id !== trackId),
        favoriteTrackIds: newIds,
        count: state.count - 1,
      }
    })
  },

  isFavorited: (trackId) => {
    return get().favoriteTrackIds.has(trackId)
  },

  toggleFavorite: (track) => {
    const isFavorited = get().isFavorited(track.id)
    if (isFavorited) {
      get().removeFavorite(track.id)
    } else {
      get().addFavorite(track)
    }
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setCount: (count) => set({ count }),

  clear: () =>
    set({
      favorites: [],
      favoriteTrackIds: new Set(),
      count: 0,
      error: null,
    }),
}))

export default useFavoritesStore




