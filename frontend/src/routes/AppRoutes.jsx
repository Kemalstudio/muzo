import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/Layout'
import AuthLayout from '../components/layout/AuthLayout'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import PageLoader from '../components/ui/PageLoader'

const HomePage = lazy(() => import('../pages/Home'))
const ExplorePage = lazy(() => import('../pages/Explore'))
const SearchPage = lazy(() => import('../pages/Search'))
const ArtistPage = lazy(() => import('../pages/Artist'))
const AlbumPage = lazy(() => import('../pages/Album'))
const PlaylistPage = lazy(() => import('../pages/Playlist'))
const UserPlaylistsPage = lazy(() => import('../pages/UserPlaylists'))
const GenrePage = lazy(() => import('../pages/Genre'))
const FavoritesPage = lazy(() => import('../pages/Favorites'))
const HistoryPage = lazy(() => import('../pages/History'))
const LibraryPage = lazy(() => import('../pages/Library'))
const ProfilePage = lazy(() => import('../pages/Profile'))
const LoginPage = lazy(() => import('../pages/Login'))
const RegisterPage = lazy(() => import('../pages/Register'))
const NotFoundPage = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="album/:id" element={<AlbumPage />} />
          <Route path="playlist/:id" element={<PlaylistPage />} />
          <Route path="genre/:id" element={<GenrePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="library" element={<LibraryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="playlists" element={<UserPlaylistsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}




