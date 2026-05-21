import { useCallback } from 'react'
import {
  addToFavorites as addToFavoritesAPI,
  removeFromFavorites as removeFromFavoritesAPI,
} from '../services/favoritesService'
import useFavoritesStore from '../store/useFavoritesStore'

export default function useFavorite(track) {
  const { isFavorited, addFavorite, removeFavorite, setError } = useFavoritesStore()
  const isCurrentlyFavorited = isFavorited(track?.id)

  const toggleFavorite = useCallback(async () => {
    if (!track?.id) return

    try {
      setError(null)

      if (isCurrentlyFavorited) {
        await removeFromFavoritesAPI(track.id)
        removeFavorite(track.id)
      } else {
        await addToFavoritesAPI(track.id)
        addFavorite(track)
      }

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || error.message
      setError(message)
      return { success: false, error: message }
    }
  }, [track, isCurrentlyFavorited, addFavorite, removeFavorite, setError])

  return {
    isFavorited: isCurrentlyFavorited,
    toggleFavorite,
  }
}
