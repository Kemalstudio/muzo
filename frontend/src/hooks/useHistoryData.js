import { useEffect, useState } from 'react'
import { fetchHistoryGroupedByDate, fetchHistoryStats } from '../services/historyService'
import useHistoryStore from '../store/useHistoryStore'

export default function useHistoryData() {
  const { setHistoryGrouped, setStats, setLoading, setError } = useHistoryStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    let mounted = true

    setLoading(true)
    Promise.all([fetchHistoryGroupedByDate(), fetchHistoryStats()])
      .then(([historyData, statsData]) => {
        if (!mounted) return

        setHistoryGrouped(historyData.data || [])
        setStats(statsData)
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
  }, [isInitialized, setHistoryGrouped, setStats, setLoading, setError])

  return {
    historyGrouped: useHistoryStore((state) => state.historyGrouped),
    stats: useHistoryStore((state) => state.stats),
    loading: useHistoryStore((state) => state.loading),
    error: useHistoryStore((state) => state.error),
  }
}




