import api from './api'

export async function fetchHistory(limit = 50) {
  const response = await api.get('/me/history', {
    params: { limit },
  })
  return response.data
}

export async function fetchHistoryGroupedByDate() {
  const response = await api.get('/me/history/grouped')
  return response.data
}

export async function fetchHistoryStats() {
  const response = await api.get('/me/history/stats')
  return response.data
}

export async function recordPlay(trackId, context = {}) {
  const response = await api.post(`/tracks/${trackId}/play`, {
    track_id: trackId,
    context,
  })
  return response.data
}

export async function clearHistory() {
  const response = await api.delete('/me/history')
  return response.data
}




