import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import useAuthStore from '../../store/useAuthStore'

export default function Header({ mobileMenuOpen, toggleMobileMenu }) {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl shadow-glow py-4">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4 px-4 md:px-6 xl:px-0">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="badge-glow text-sm uppercase tracking-[0.32em]">MUZO</span>
          <div>
            <p className="text-sm font-semibold mb-1">High-end streaming</p>
            <p className="text-xs text-slate-400">Modern playlists, premium design</p>
          </div>
        </Link>

        <div className="flex-1 hidden lg:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <button className="spotify-btn spotify-btn-secondary text-sm">Minimal</button>
            <button className="spotify-btn spotify-btn-secondary text-sm">House</button>
            <button className="spotify-btn spotify-btn-secondary text-sm">Chill</button>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="spotify-btn spotify-btn-secondary lg:hidden text-sm"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>

          {token && user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
                <span className="hidden xl:inline">{user.name}</span>
              </Link>
              <button onClick={logout} className="spotify-btn spotify-btn-secondary text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Link to="/login" className="spotify-btn spotify-btn-secondary text-sm">
                Login
              </Link>
              <Link to="/register" className="spotify-btn spotify-btn-primary text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}




