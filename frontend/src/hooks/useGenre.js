import { useEffect, useState } from 'react'
import { fetchGenreById } from '../services/genreService'

export default function useGenre(id) {
  const [genre, setGenre] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    let mounted = true

    fetchGenreById(id)
      .then((data) => {
        if (!mounted) return
        setGenre(data)
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

  return { genre, loading, error }
}




