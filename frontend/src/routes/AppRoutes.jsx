import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/Layout'
import HomePage from '../pages/Home'
import ExplorePage from '../pages/Explore'
import SearchPage from '../pages/Search'
import ArtistPage from '../pages/Artist'
import AlbumPage from '../pages/Album'
import PlaylistPage from '../pages/Playlist'
import UserPlaylistsPage from '../pages/UserPlaylists'
import GenrePage from '../pages/Genre'
import FavoritesPage from '../pages/Favorites'
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
        <Route path="explore" element={<ExplorePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="album/:id" element={<AlbumPage />} />
        <Route path="playlist/:id" element={<PlaylistPage />} />
        <Route path="genre/:id" element={<GenrePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="library" element={<LibraryPage />} />
          <Route path="playlists" element={<UserPlaylistsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
