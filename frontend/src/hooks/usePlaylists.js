import { useEffect, useState } from 'react'
import { fetchPlaylists } from '../services/playlistService'

const normalizeArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : []

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchPlaylists()
      .then((data) => {
        if (!mounted) return
        setPlaylists(normalizeArray(data))
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
