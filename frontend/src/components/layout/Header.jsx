import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import useAuthStore from '../../store/useAuthStore'

export default function Header({ mobileMenuOpen, toggleMobileMenu }) {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="sticky-top top-0 z-50 border-b border-white/10 bg-[rgba(7,10,18,0.92)] backdrop-blur-xl shadow-[0_16px_60px_-28px_rgba(0,0,0,0.75)] py-3">
      <div className="container-fluid flex flex-wrap items-center gap-3">
        <Link to="/" className="navbar-brand flex items-center gap-3 p-0 text-white">
          <span className="badge-soft bg-linear-to-r from-indigo-500 to-cyan-400 text-black rounded-full py-2 px-3 shadow-glow">MUZO</span>
          <div className="flex flex-col">
            <span className="font-semibold">Music Studio</span>
            <small className="text-secondary">Modern beats & premium playlists</small>
          </div>
        </Link>

        <div className="flex-1 hidden lg:flex px-2">
          <SearchBar />
        </div>

        <div className="flex flex-wrap gap-2 items-center ml-auto">
          <div className="hidden lg:flex gap-2">
            <button className="spotify-btn spotify-btn-secondary px-3 py-2 text-sm">Minimal</button>
            <button className="spotify-btn spotify-btn-secondary px-3 py-2 text-sm">House</button>
            <button className="spotify-btn spotify-btn-secondary px-3 py-2 text-sm">Chill</button>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="spotify-btn spotify-btn-secondary lg:hidden px-4 py-2 text-sm"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>

          {token && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white bg-opacity-5 px-3 py-2 text-white text-decoration-none"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Avatar" className="rounded-full" style={{ width: 32, height: 32, objectFit: 'cover' }} />
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black fw-bold" style={{ width: 32, height: 32 }}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
                <span className="hidden d-xl-inline text-white">{user.name}</span>
              </Link>
              <button onClick={logout} className="spotify-btn spotify-btn-secondary px-3 py-2 text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Link to="/login" className="spotify-btn spotify-btn-secondary px-3 py-2 text-sm">
                Login
              </Link>
              <Link to="/register" className="spotify-btn spotify-btn-primary px-3 py-2 text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}




