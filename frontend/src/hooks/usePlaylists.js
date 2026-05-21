import { useEffect, useState } from 'react'
import { fetchPlaylists } from '../services/playlistService'

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchPlaylists()
      .then((data) => {
        if (!mounted) return
        setPlaylists(data)
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
  }, [])

  return { playlists, loading, error }
}
