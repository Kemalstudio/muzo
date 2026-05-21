import { useEffect, useState } from 'react'
import { fetchHistory } from '../services/historyService'
import useHistoryStore from '../store/useHistoryStore'

export default function useRecentlyPlayed(limit = 50) {
  const { setHistory, setLoading, setError, history } = useHistoryStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    let mounted = true

    setLoading(true)
    fetchHistory(limit)
      .then((data) => {
        if (!mounted) return

        const tracks = data.data || []
        setHistory(tracks)
        setIsInitialized(true)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [isInitialized, limit, setHistory, setLoading, setError])

  return {
    history: useHistoryStore((state) => state.history),
    loading: useHistoryStore((state) => state.loading),
    error: useHistoryStore((state) => state.error),
  }
}
