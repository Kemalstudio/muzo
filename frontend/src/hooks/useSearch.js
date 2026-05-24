import { useEffect, useState, useCallback } from 'react'
import { searchAll } from '../services/searchService'

export default function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState({
    tracks: [],
    artists: [],
    albums: [],
    genres: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        tracks: [],
        artists: [],
        albums: [],
        genres: []
      })
      setError(null)
      return
    }

    setLoading(true)
    const timer = setTimeout(() => {
      searchAll(query)
        .then((data) => {
          setResults(data)
          setError(null)
        })
        .catch((err) => {
          setError(err)
          setResults({
            tracks: [],
            artists: [],
            albums: [],
            genres: []
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }, 300) // Debounce 300ms

    return () => clearTimeout(timer)
  }, [query])

  return { query, setQuery, results, loading, error }
}




