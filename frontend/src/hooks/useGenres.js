import { useEffect, useState } from 'react'
import { fetchGenres } from '../services/genreService'

export default function useGenres() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchGenres()
      .then((data) => {
        if (!mounted) return
        setGenres(data)
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

  return { genres, loading, error }
}
