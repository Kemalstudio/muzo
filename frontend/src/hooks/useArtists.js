import { useEffect, useState } from 'react'
import { fetchArtists } from '../services/artistService'

export default function useArtists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchArtists()
      .then((data) => {
        if (!mounted) return
        setArtists(data)
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

  return { artists, loading, error }
}
