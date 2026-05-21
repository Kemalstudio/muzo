import api from './api'

export async function fetchGenres() {
  const response = await api.get('/genres')
  return response.data
}

export async function fetchGenreById(id) {
  const response = await api.get(`/genres/${id}`)
  return response.data
}
