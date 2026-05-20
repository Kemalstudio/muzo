import { useEffect, useState } from 'react'
import { fetchTracks } from '../services/trackService'

export default function useTracks() {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchTracks()
      .then((data) => {
        if (!mounted) return
        setTracks(data)
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

  return { tracks, loading, error }
}
