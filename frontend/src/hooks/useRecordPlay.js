import { useCallback } from 'react'
import { recordPlay } from '../services/historyService'
import useHistoryStore from '../store/useHistoryStore'

export default function useRecordPlay() {
  const { addToHistory, setError } = useHistoryStore()

  const recordPlayback = useCallback(
    async (track, context = {}) => {
      if (!track?.id) return

      try {
        setError(null)

        // Record optimistically
        addToHistory(track)

        // Send to API
        await recordPlay(track.id, context)

        return { success: true }
      } catch (error) {
        const message = error.response?.data?.message || error.message
        setError(message)
        return { success: false, error: message }
      }
    },
    [addToHistory, setError]
  )

  return { recordPlayback }
}
