import { NavLink } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Library', to: '/library' },
  { label: 'Playlists', to: '/playlists' },
  { label: 'Liked Songs', to: '/favorites' },
  { label: 'Recently Played', to: '/history' },
]

export default function Sidebar() {
  const token = useAuthStore((state) => state.token)

  return (
    <aside className="hidden d-xl-block">
      <div className="position-sticky top-4">
        <div className="spotify-card mb-4 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3 bg-linear-to-r from-indigo-600 to-cyan-400 text-black fs-5 fw-bold shadow-glow">
              M
            </div>
            <div>
              <p className="mb-1 text-uppercase text-secondary small">Premium</p>
              <p className="mb-0 font-semibold text-white">MUZO</p>
            </div>
          </div>

          <nav className="nav flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link rounded-4 px-3 py-2 transition ${
                    isActive
                      ? 'active bg-linear-to-r from-indigo-600/20 to-purple-600/15 text-white shadow-glow'
                      : 'text-secondary text-decoration-none hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {token ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link rounded-4 px-3 py-2 ${
                    isActive
                      ? 'active bg-white/10 text-white'
                      : 'text-secondary text-decoration-none hover-bg-white hover-bg-opacity-5'
                  }`
                }
              >
                Profile
              </NavLink>
            ) : null}
          </nav>
        </div>

        <div className="rounded-4 border border-white/10 bg-black bg-opacity-80 p-4 text-secondary shadow-sm">
          <p className="mb-2 text-white font-semibold">Discover more</p>
          <p className="small mb-0">Latest drops, live mixes and curated playlists for your mood.</p>
        </div>
      </div>
    </aside>
  )
}




