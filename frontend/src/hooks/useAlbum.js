import { useEffect, useState } from 'react'
import { fetchAlbumById } from '../services/albumService'

export default function useAlbum(id) {
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    let mounted = true

    fetchAlbumById(id)
      .then((data) => {
        if (!mounted) return
        setAlbum(data)
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

  return { album, loading, error }
}
