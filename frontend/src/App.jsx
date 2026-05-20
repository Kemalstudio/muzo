import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import useAuthStore from './store/useAuthStore'
import { fetchMe } from './services/authService'

export default function App() {
  const loadLocalAuth = useAuthStore((state) => state.loadLocalAuth)
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setAuth = useAuthStore((state) => state.setAuth)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    loadLocalAuth()
  }, [loadLocalAuth])

  useEffect(() => {
    if (!token || user) {
      return
    }

    fetchMe()
      .then((currentUser) => {
        setAuth(token, currentUser)
      })
      .catch(() => logout())
  }, [token, user, setAuth, logout])

  return <AppRoutes />
}