import axios from 'axios'
import { API_BASE_URL } from '../config'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export function setAuthToken(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function clearAuthToken() {
  delete api.defaults.headers.common.Authorization
}

export default api
