import create from 'zustand'
import { setAuthToken, clearAuthToken } from '../services/api'

const AUTH_TOKEN_KEY = 'muzo_auth_token'
const AUTH_USER_KEY = 'muzo_auth_user'

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  error: null,

  setAuth: (token, user = null) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      if (user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
      }
      setAuthToken(token)
      set({ token, user, error: null })
      return
    }

    clearAuthToken()
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    set({ token: null, user: null, error: null })
  },

  loadLocalAuth: () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const userString = localStorage.getItem(AUTH_USER_KEY)
    if (token) {
      setAuthToken(token)
      set({ token, user: userString ? JSON.parse(userString) : null })
    }
  },

  updateUser: (user) => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    }
    set({ user })
  },

  logout: () => {
    clearAuthToken()
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    set({ token: null, user: null, error: null })
  },
}))

export default useAuthStore
