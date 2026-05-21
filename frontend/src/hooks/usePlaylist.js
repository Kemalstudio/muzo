import { useEffect, useState } from 'react'
import { fetchPlaylistById } from '../services/playlistService'

export default function usePlaylist(id) {
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    let mounted = true

    fetchPlaylistById(id)
      .then((data) => {
        if (!mounted) return
        setPlaylist(data)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [id])

  return { playlist, loading, error }
}
