import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Library', to: '/library' },
  { label: 'Browse', to: '/browse' },
  { label: 'Favorites', to: '/favorites' },
]

export default function Sidebar() {
  return (
    <aside className="sticky top-6 h-fit rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_100px_-80px_rgba(0,0,0,0.5)]">
      <div className="mb-8 flex items-center gap-3">
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
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white shadow-lg shadow-black/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
        <p className="text-slate-300 font-semibold">Daily mix</p>
        <p className="mt-2 text-sm leading-6">Personalized playlists, mood-based recommendations, and the latest drops.</p>
      </div>
    </aside>
  )
}
