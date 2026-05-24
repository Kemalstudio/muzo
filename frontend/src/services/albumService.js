import api from './api'

export async function fetchAlbums() {
  const response = await api.get('/albums')
  return response.data
}

export async function fetchAlbumById(id) {
  const response = await api.get(`/albums/${id}`)
  return response.data
}




