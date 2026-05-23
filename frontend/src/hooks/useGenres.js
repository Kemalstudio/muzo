import { useEffect, useState } from 'react'
import { fetchGenres } from '../services/genreService'

const normalizeArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : []

export default function useGenres() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchGenres()
      .then((data) => {
        if (!mounted) return
        setGenres(normalizeArray(data))
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
