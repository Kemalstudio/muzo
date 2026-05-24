import { useEffect, useState } from 'react'
import { fetchArtistById } from '../services/artistService'

export default function useArtist(id) {
  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    let mounted = true

    fetchArtistById(id)
      .then((data) => {
        if (!mounted) return
        setArtist(data)
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

  return { artist, loading, error }
}




