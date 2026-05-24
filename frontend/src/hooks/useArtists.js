import { useEffect, useState } from 'react'
import { fetchArtists } from '../services/artistService'

const normalizeArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : []

export default function useArtists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchArtists()
      .then((data) => {
        if (!mounted) return
        setArtists(normalizeArray(data))
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




