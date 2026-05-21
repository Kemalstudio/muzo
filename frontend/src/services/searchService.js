import api from './api'

export async function searchAll(query) {
  if (!query.trim()) {
    return { tracks: [], artists: [], albums: [], genres: [] }
  }

  const response = await api.get('/search', {
    params: { q: query }
  })
  return response.data
}

export async function searchTracks(query) {
  if (!query.trim()) return []

  const response = await api.get('/search/tracks', {
    params: { q: query }
  })
  return response.data
}

export async function searchArtists(query) {
  if (!query.trim()) return []

  const response = await api.get('/search/artists', {
    params: { q: query }
  })
  return response.data
}

export async function searchAlbums(query) {
  if (!query.trim()) return []

  const response = await api.get('/search/albums', {
    params: { q: query }
  })
  return response.data
}

export async function searchGenres(query) {
  if (!query.trim()) return []

  const response = await api.get('/search/genres', {
    params: { q: query }
  })
  return response.data
}
