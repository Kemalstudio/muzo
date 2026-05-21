import { useCallback } from 'react'
import {
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  addTracksToPlaylist,
  removeTracksFromPlaylist,
} from '../services/playlistService'
import usePlaylistStore from '../store/usePlaylistStore'

export default function usePlaylistOperations() {
  const {
    addTrackToPlaylist: addTrackStore,
    removeTrackFromPlaylist: removeTrackStore,
  } = usePlaylistStore()

  const addTrack = useCallback(
    async (playlistId, trackId) => {
      try {
        await addTrackToPlaylist(playlistId, trackId)
        addTrackStore(playlistId, { id: trackId })
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    [addTrackStore]
  )

  const removeTrack = useCallback(
    async (playlistId, trackId) => {
      try {
        await removeTrackFromPlaylist(playlistId, trackId)
        removeTrackStore(playlistId, trackId)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    [removeTrackStore]
  )

  const addTracks = useCallback(
    async (playlistId, trackIds) => {
      try {
        await addTracksToPlaylist(playlistId, trackIds)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    []
  )

  const removeTracks = useCallback(
    async (playlistId, trackIds) => {
      try {
        await removeTracksFromPlaylist(playlistId, trackIds)
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },
    []
  )

  return {
    addTrack,
    removeTrack,
    addTracks,
    removeTracks,
  }
}
