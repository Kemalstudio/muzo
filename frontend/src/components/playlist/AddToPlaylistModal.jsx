import { useState } from 'react'
import {
  createPlaylist,
  addTrackToPlaylist,
} from '../services/playlistService'
import usePlaylistStore from '../store/usePlaylistStore'

export default function AddToPlaylistModal({ track, isOpen, onClose }) {
  const { userPlaylists, addPlaylist, addTrackToPlaylist } = usePlaylistStore()
  const [isCreating, new_playlist] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleCreateAndAdd = async () => {
    if (!newPlaylistName.trim()) return

    setLoading(true)
    setError(null)

    try {
      const newPlaylist = await createPlaylist({
        name: newPlaylistName,
        description: `Created from ${track.title}`,
      })

      await addTrackToPlaylist(newPlaylist.id, track.id)

      addPlaylist(newPlaylist)
      addTrackToPlaylist(newPlaylist.id, track)

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setNewPlaylistName('')
        new_playlist(false)
        setSuccess(false)
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to create playlist')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToExisting = async (playlistId) => {
    setLoading(true)
    setError(null)

    try {
      await addTrackToPlaylist(playlistId, track.id)
      addTrackToPlaylist(playlistId, track)

      setSuccess(true)
      setSelectedPlaylistId(playlistId)
      setTimeout(() => {
        onClose()
        setSelectedPlaylistId(null)
        setSuccess(false)
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to add track')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Add to Playlist</h2>
            <p className="mt-1 text-sm text-slate-400">{track.title}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-800 transition"
          >
            <svg
              className="h-6 w-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
            <p className="text-sm font-semibold text-green-400">
              ✓ Successfully added!
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3">
            <p className="text-sm font-semibold text-rose-400">{error}</p>
          </div>
        )}

        {/* Create New Playlist Section */}
        {!isCreating ? (
          <div className="mb-6">
            <button
              onClick={() => new_playlist(true)}
              className="w-full rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 py-3 text-slate-300 transition hover:border-indigo-600 hover:bg-indigo-600/10 hover:text-white"
            >
              <svg
                className="mx-auto h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="mt-1 block text-sm font-semibold">
                Create New Playlist
              </span>
            </button>
          </div>
        ) : (
          <div className="mb-6 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/50 p-4">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => new_playlist(false)}
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAndAdd}
                disabled={!newPlaylistName.trim() || loading}
                className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        )}

        {/* Existing Playlists */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Playlists
          </p>
          {userPlaylists.length > 0 ? (
            userPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handleAddToExisting(playlist.id)}
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-left transition hover:border-indigo-500 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{playlist.name}</p>
                    <p className="text-xs text-slate-400">
                      {playlist.tracks?.length || 0} songs
                    </p>
                  </div>
                  {selectedPlaylistId === playlist.id && success && (
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-500">
              No playlists yet. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
