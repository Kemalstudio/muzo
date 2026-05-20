import api from './api'

export async function fetchLibraryItems() {
  const response = await api.get('/me/library')
  return response.data
}

export async function addLibraryItem(item) {
  const response = await api.post('/me/library', item)
  return response.data
}
