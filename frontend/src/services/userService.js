import api from './api'

export async function updateUserProfile(userId, formData) {
  const response = await api.patch(`users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data
}




