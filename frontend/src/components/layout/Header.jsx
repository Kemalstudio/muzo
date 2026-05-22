import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import useAuthStore from '../../store/useAuthStore'

export default function Header({ mobileMenuOpen, toggleMobileMenu }) {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl shadow-black/30 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-linear-to-br from-violet-600 via-pink-500 to-rose-500 text-lg font-bold text-white shadow-[0_16px_40px_-24px_rgba(236,72,153,0.8)]">
            M
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Premium</p>
            <p className="text-xl font-semibold text-white">MUZO</p>
          </div>
        </div>

        <div className="flex-1 px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/" className="transition duration-300 hover:text-white hover:scale-[1.01]">Home</Link>
            <Link to="/explore" className="transition duration-300 hover:text-white hover:scale-[1.01]">Explore</Link>
            <Link to="/library" className="transition duration-300 hover:text-white hover:scale-[1.01]">Library</Link>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 lg:hidden"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>

          <div className="hidden lg:flex items-center gap-3">
            {token && user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt="Avatar" className="h-6 w-6 rounded-full object-cover" />
                  ) : (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button onClick={logout} className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 transition hover:bg-slate-800">
                  Login
                </Link>
                <Link to="/register" className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 transition hover:bg-slate-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
