import { useEffect, useState } from 'react'
import { fetchUserPlaylists } from '../services/playlistService'
import usePlaylistStore from '../store/usePlaylistStore'

export default function useUserPlaylists() {
  const { userPlaylists, setUserPlaylists, setLoading, setError } =
    usePlaylistStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isInitialized) return

    let mounted = true

    setLoading(true)
    fetchUserPlaylists()
      .then((data) => {
        if (!mounted) return
        setUserPlaylists(data)
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
  }, [isInitialized, setUserPlaylists, setLoading, setError])

  return {
    playlists: userPlaylists,
    loading: usePlaylistStore((state) => state.loading),
    error: usePlaylistStore((state) => state.error),
  }
}




