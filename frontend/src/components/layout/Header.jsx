import { Link } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'
import useAuthStore from '../../store/useAuthStore'

export default function Header({ mobileMenuOpen, toggleMobileMenu }) {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="navbar navbar-dark sticky-top bg-black bg-opacity-95 border-bottom border-white/10 shadow-sm py-3">
      <div className="container-fluid d-flex flex-wrap align-items-center gap-3">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-3 p-0 text-white">
          <span className="badge bg-success text-black rounded-pill py-2 px-3">MUZO</span>
          <span className="fw-semibold">Music</span>
        </Link>

        <div className="flex-fill d-none d-lg-flex px-2">
          <SearchBar />
        </div>

        <div className="d-flex flex-wrap gap-2 align-items-center ms-auto">
          <div className="d-none d-lg-flex gap-2">
            <button className="btn btn-outline-light btn-sm rounded-pill px-3">Minimal</button>
            <button className="btn btn-outline-light btn-sm rounded-pill px-3">House</button>
            <button className="btn btn-outline-light btn-sm rounded-pill px-3">Chill</button>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="btn btn-outline-light btn-sm rounded-pill d-lg-none"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>

          {token && user ? (
            <div className="d-flex align-items-center gap-2">
              <Link
                to="/profile"
                className="d-flex align-items-center gap-2 rounded-pill border border-white/10 bg-white bg-opacity-5 px-3 py-2 text-white text-decoration-none"
              >
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Avatar" className="rounded-circle" style={{ width: 32, height: 32, objectFit: 'cover' }} />
                ) : (
                  <span className="d-inline-flex h-8 w-8 align-items-center justify-content-center rounded-circle bg-white text-black fw-bold" style={{ width: 32, height: 32 }}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
                <span className="d-none d-xl-inline text-white">{user.name}</span>
              </Link>
              <button onClick={logout} className="btn btn-outline-light btn-sm rounded-pill px-3">
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex flex-wrap gap-2">
              <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill px-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-light btn-sm rounded-pill px-3 text-black">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
