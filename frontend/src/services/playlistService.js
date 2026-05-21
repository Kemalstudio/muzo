import api from './api'

export async function fetchPlaylists() {
  const response = await api.get('/playlists')
  return response.data
}

export async function fetchUserPlaylists() {
  const response = await api.get('/me/playlists')
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

export async function addTrackToPlaylist(playlistId, trackId) {
  const response = await api.post(`/playlists/${playlistId}/tracks`, {
    track_id: trackId
  })
  return response.data
}

export async function removeTrackFromPlaylist(playlistId, trackId) {
  const response = await api.delete(`/playlists/${playlistId}/tracks/${trackId}`)
  return response.data
}

export async function addTracksToPlaylist(playlistId, trackIds) {
  const response = await api.post(`/playlists/${playlistId}/tracks/batch`, {
    track_ids: trackIds
  })
  return response.data
}

export async function removeTracksFromPlaylist(playlistId, trackIds) {
  const response = await api.delete(`/playlists/${playlistId}/tracks/batch`, {
    data: { track_ids: trackIds }
  })
  return response.data
}
