import api from './api'

export async function login(values) {
  const response = await api.post('login', values)
  return response.data.data
}

export async function register(values) {
  const response = await api.post('register', values)
  return response.data.data
}

export async function fetchMe() {
  const response = await api.get('me')
  return response.data.data
}

export async function logout() {
  const response = await api.post('logout')
  return response.data
}




