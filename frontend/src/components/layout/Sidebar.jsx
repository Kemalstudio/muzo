import { NavLink } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const navItems = [
  {
    label: 'Home',
    to: '/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5L12 3l9 7.5v8.5a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1v-8.5z" />
      </svg>
    ),
  },
  {
    label: 'Explore',
    to: '/explore',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 4.5-7 4.5L5 7.5 12 3zm0 10.5l7 4.5-7 4.5-7-4.5 7-4.5z" />
      </svg>
    ),
  },
  {
    label: 'Library',
    to: '/library',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 4.5h14v15H5z" />
        <path d="M7.5 7.5h9" />
        <path d="M7.5 11.5h9" />
      </svg>
    ),
  },
  {
    label: 'Playlists',
    to: '/playlists',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 5h12" />
        <path d="M6 10h9" />
        <path d="M6 15h12" />
        <path d="M18 15v4a1 1 0 01-1 1H7" />
      </svg>
    ),
  },
  {
    label: 'Liked Songs',
    to: '/favorites',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-6-4.4-9-8.3C1.1 8.2 3.7 5 7.5 5 10 5 12 7 12 7s2-2 4.5-2C20.3 5 22.9 8.2 21 11.7 18 15.6 12 20 12 20z" />
      </svg>
    ),
  },
  {
    label: 'Recently Played',
    to: '/history',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4v4" />
        <path d="M12 16v4" />
        <path d="M4.5 12h15" />
        <path d="M7.5 7.5l4.5 4.5L16.5 7.5" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const token = useAuthStore((state) => state.token)

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-6 space-y-5">
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-600 to-cyan-400 text-black text-xl font-black shadow-glow">
              M
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Premium</p>
              <p className="text-xl font-semibold">MUZO</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 nav-glow">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            {token ? (
              <NavLink
                to="/profile"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  <path d="M6 20a6 6 0 0112 0" />
                </svg>
                <span>Profile</span>
              </NavLink>
            ) : null}
          </nav>
        </div>

        <div className="glass-panel p-5 text-slate-300">
          <p className="text-white font-semibold mb-2">Discover more</p>
          <p className="text-sm leading-6">Explore the newest soundscapes, live mixes, and curated playlists designed for modern listening.</p>
        </div>
      </div>
    </aside>
  )
}




