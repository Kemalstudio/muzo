import api from './api'

export async function fetchArtists() {
  const response = await api.get('/artists')
  return response.data
}

export async function fetchArtistById(id) {
  const response = await api.get(`/artists/${id}`)
  return response.data
}




