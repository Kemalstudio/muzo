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
    <aside className="lg:sticky lg:top-6 lg:self-start rounded-3xl glass-panel p-5">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,70,229,1),rgba(236,72,153,1),rgba(244,63,94,1))] text-xl font-bold text-white">M</div>
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Premium</p>
          <p className="text-lg font-semibold text-white">MUZO</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 ease-out transform ${
                isActive
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 hover:scale-[1.01]'
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
              `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 ease-out transform ${
                isActive
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white hover:-translate-y-0.5 hover:scale-[1.01]'
              }`
            }
          >
            Profile
          </NavLink>
        ) : null}
      </nav>

      <div className="mt-8 glass-card p-4 text-sm text-slate-400">
        <p className="text-slate-300 font-semibold">Daily mix</p>
        <p className="mt-2 text-sm leading-6">Personalized playlists, mood-based recommendations, and the latest drops.</p>
      </div>
    </aside>
  )
}
