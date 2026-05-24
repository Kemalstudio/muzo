import { create } from 'zustand'

const usePlaylistStore = create((set, get) => ({
  userPlaylists: [],
  loading: false,
  error: null,

  setUserPlaylists: (playlists) => set({ userPlaylists: playlists }),

  addPlaylist: (playlist) =>
    set((state) => ({
      userPlaylists: [playlist, ...state.userPlaylists],
    })),

  updatePlaylist: (id, updatedData) =>
    set((state) => ({
      userPlaylists: state.userPlaylists.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p
      ),
    })),

  removePlaylist: (id) =>
    set((state) => ({
      userPlaylists: state.userPlaylists.filter((p) => p.id !== id),
    })),

  addTrackToPlaylist: (playlistId, track) =>
    set((state) => ({
      userPlaylists: state.userPlaylists.map((p) =>
        p.id === playlistId
          ? {
              ...p,
              tracks: [...(p.tracks || []), track],
            }
          : p
      ),
    })),

  removeTrackFromPlaylist: (playlistId, trackId) =>
    set((state) => ({
      userPlaylists: state.userPlaylists.map((p) =>
        p.id === playlistId
          ? {
              ...p,
              tracks: (p.tracks || []).filter((t) => t.id !== trackId),
            }
          : p
      ),
    })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  getPlaylist: (id) => get().userPlaylists.find((p) => p.id === id),
}))

export default usePlaylistStore




