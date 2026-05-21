import { useState } from 'react'
import { removeTrackFromPlaylist } from '../services/playlistService'
import usePlaylistStore from '../store/usePlaylistStore'

export default function RemoveFromPlaylistModal({
  track,
  playlist,
  isOpen,
  onClose,
  onRemove,
}) {
  const { removeTrackFromPlaylist } = usePlaylistStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  const handleRemove = async () => {
    setLoading(true)
    setError(null)

    try {
      await removeTrackFromPlaylist(playlist.id, track.id)
      removeTrackFromPlaylist(playlist.id, track.id)

      onRemove?.()
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (err) {
      setError(err.message || 'Failed to remove track')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Remove from Playlist?</h2>
          <p className="mt-2 text-sm text-slate-400">
            Are you sure you want to remove "{track.title}" from "
            {playlist.name}"?
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3">
            <p className="text-sm font-semibold text-rose-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 font-semibold text-slate-300 transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="flex-1 rounded-lg bg-rose-600 px-4 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  )
}
