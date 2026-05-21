import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserPlaylists from '../hooks/useUserPlaylists'
import usePlayerStore from '../store/usePlayerStore'
import {
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
} from '../services/playlistService'
import usePlaylistStore from '../store/usePlaylistStore'

export default function UserPlaylists() {
  const navigate = useNavigate()
  const { playlists, loading: dataLoading } = useUserPlaylists()
  const playPlayer = usePlayerStore((state) => state.play)
  const { addPlaylist, removePlaylist, updatePlaylist: updateStorePlaylist } =
    usePlaylistStore()

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleCreatePlaylist = async () => {
    if (!formData.name.trim()) {
      setError('Playlist name is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const newPlaylist = await createPlaylist({
        name: formData.name,
        description: formData.description,
      })

      addPlaylist(newPlaylist)
      setFormData({ name: '', description: '' })
      setShowCreateDialog(false)
    } catch (err) {
      setError(err.message || 'Failed to create playlist')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePlaylist = async (id) => {
    if (!formData.name.trim()) {
      setError('Playlist name is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await updatePlaylist(id, {
        name: formData.name,
        description: formData.description,
      })

      updateStorePlaylist(id, {
        name: formData.name,
        description: formData.description,
      })

      setFormData({ name: '', description: '' })
      setEditingId(null)
    } catch (err) {
      setError(err.message || 'Failed to update playlist')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlaylist = async (id) => {
    setLoading(true)
    setError(null)

    try {
      await deletePlaylist(id)
      removePlaylist(id)
      setDeleteConfirm(null)
    } catch (err) {
      setError(err.message || 'Failed to delete playlist')
    } finally {
      setLoading(false)
    }
  }

  const handlePlayPlaylist = useCallback(
    (playlist) => {
      if (playlist.tracks && playlist.tracks.length > 0) {
        playPlayer(playlist.tracks)
      }
    },
    [playPlayer]
  )

  const startEdit = (playlist) => {
    setFormData({
      name: playlist.name,
      description: playlist.description || '',
    })
    setEditingId(playlist.id)
  }

  const cancelEdit = () => {
    setFormData({ name: '', description: '' })
    setEditingId(null)
    setError(null)
  }

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600 border-opacity-50"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-8 pb-32">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Your Playlists</h1>
        <p className="text-slate-400">Create and manage your custom playlists</p>
      </div>

      {/* Create Playlist Button */}
      <button
        onClick={() => setShowCreateDialog(true)}
        className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 px-6 py-4 text-slate-300 transition hover:border-indigo-600 hover:bg-indigo-600/10 hover:text-white"
      >
        <svg
          className="mb-2 inline-block h-6 w-6"
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
        <span className="ml-2 font-semibold">Create New Playlist</span>
      </button>

      {/* Create/Edit Dialog */}
      {(showCreateDialog || editingId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-white">
              {editingId ? 'Edit Playlist' : 'Create Playlist'}
            </h2>

            {error && (
              <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3">
                <p className="text-sm font-semibold text-rose-400">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Playlist Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="My Awesome Playlist"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What's this playlist about?"
                  rows={3}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={cancelEdit}
                disabled={loading}
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 font-semibold text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingId) {
                    handleUpdatePlaylist(editingId)
                  } else {
                    handleCreatePlaylist()
                  }
                }}
                disabled={loading}
                className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 font-semibold text-white transition hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
            <h2 className="mb-2 text-2xl font-bold text-white">Delete Playlist?</h2>
            <p className="mb-6 text-slate-400">
              This action cannot be undone. All songs in this playlist will be
              removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
                className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 font-semibold text-slate-300 transition hover:bg-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePlaylist(deleteConfirm)}
                disabled={loading}
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlists Grid */}
      {playlists.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 p-6 transition hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              {/* Thumbnail */}
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="h-16 w-16 text-white/50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 1 1 0 000-2H6a4 4 0 00-4 4v10a4 4 0 004 4h8a4 4 0 004-4V7a1 1 0 100 2h1a1 1 0 100-2h-1a4 4 0 00-4-4H6a1 1 0 000 2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Play Button Overlay */}
                <button
                  onClick={() => handlePlayPlaylist(playlist)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40"
                >
                  <svg className="h-12 w-12 text-white opacity-0 transition group-hover:opacity-100">
                    <path
                      d="M8 5v14l11-7z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <h3 className="line-clamp-2 text-lg font-bold text-white">
                {playlist.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                {playlist.description || 'No description'}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {playlist.tracks?.length || 0} songs
              </p>

              {/* Actions */}
              <div className="mt-4 flex gap-2 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:bg-slate-700 hover:text-white"
                >
                  View
                </button>
                <button
                  onClick={() => startEdit(playlist)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:bg-slate-700 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(playlist.id)}
                  className="rounded-lg border border-rose-600/50 bg-rose-600/10 px-3 py-2 text-sm font-semibold text-rose-400 transition hover:border-rose-600 hover:bg-rose-600/20"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 py-16 text-center">
          <svg
            className="mx-auto h-16 w-16 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <h3 className="mt-4 text-xl font-bold text-white">No Playlists Yet</h3>
          <p className="mt-2 text-slate-400">
            Create your first playlist to get started
          </p>
        </div>
      )}
    </div>
  )
}
