import { useEffect, useState } from 'react'
import { fetchLibraryItems } from '../services/libraryService'

export default function useLibrary() {
  const [library, setLibrary] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetchLibraryItems()
      .then((data) => {
        if (!mounted) return
        setLibrary(data)
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

  return { library, loading, error }
}
