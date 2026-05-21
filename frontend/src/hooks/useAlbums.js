import { useEffect, useState } from 'react'
import { fetchAlbums } from '../services/albumService'

export default function useAlbums() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchAlbums()
      .then((data) => {
        if (!mounted) return
        setAlbums(data)
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

  return { albums, loading, error }
}
