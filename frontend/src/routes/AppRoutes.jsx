import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/Layout'
import HomePage from '../pages/Home'
import LibraryPage from '../pages/Library'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import NotFoundPage from '../pages/NotFound'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="library" element={<LibraryPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
