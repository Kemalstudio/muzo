import { useEffect, useState } from 'react'
import { fetchFavorites } from '../services/favoritesService'
import useFavoritesStore from '../store/useFavoritesStore'

export default function useFavorites() {
  const { setFavorites, setLoading, setError, favorites } = useFavoritesStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    let mounted = true

    setLoading(true)
    fetchFavorites()
      .then((data) => {
        if (!mounted) return

        // Handle paginated response
        const tracks = data.data ? data.data : data
        setFavorites(Array.isArray(tracks) ? tracks : [])
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
  }, [isInitialized, setFavorites, setLoading, setError])

  return {
    favorites: useFavoritesStore((state) => state.favorites),
    loading: useFavoritesStore((state) => state.loading),
    error: useFavoritesStore((state) => state.error),
  }
}




