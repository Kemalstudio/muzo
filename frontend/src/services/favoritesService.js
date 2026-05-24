import api from './api'

export async function fetchFavorites() {
  const response = await api.get('/me/favorites')
  return response.data
}

export async function getFavoritesCount() {
  const response = await api.get('/me/favorites/count')
  return response.data
}

export async function isFavorited(trackId) {
  const response = await api.get(`/tracks/${trackId}/favorite`)
  return response.data
}

export async function addToFavorites(trackId) {
  const response = await api.post(`/tracks/${trackId}/favorite`)
  return response.data
}

export async function removeFromFavorites(trackId) {
  const response = await api.delete(`/tracks/${trackId}/favorite`)
  return response.data
}

export async function batchAddFavorites(trackIds) {
  const response = await api.post('/favorites/batch-add', {
    track_ids: trackIds,
  })
  return response.data
}

export async function batchRemoveFavorites(trackIds) {
  const response = await api.post('/favorites/batch-remove', {
    track_ids: trackIds,
  })
  return response.data
}




