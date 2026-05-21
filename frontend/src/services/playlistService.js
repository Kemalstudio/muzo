import api from './api'

export async function fetchPlaylists() {
  const response = await api.get('/playlists')
  return response.data
}

export async function fetchPlaylistById(id) {
  const response = await api.get(`/playlists/${id}`)
  return response.data
}

export async function createPlaylist(data) {
  const response = await api.post('/playlists', data)
  return response.data
}

export async function updatePlaylist(id, data) {
  const response = await api.put(`/playlists/${id}`, data)
  return response.data
}

export async function deletePlaylist(id) {
  const response = await api.delete(`/playlists/${id}`)
  return response.data
}
