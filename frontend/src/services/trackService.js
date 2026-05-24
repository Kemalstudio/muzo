import api from './api'

export async function fetchTracks() {
  const response = await api.get('/tracks')
  return response.data
}

export async function fetchTrackById(id) {
  const response = await api.get(`/tracks/${id}`)
  return response.data
}




