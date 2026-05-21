import { Link, Outlet } from 'react-router-dom'
import PlayerBar from '../player/PlayerBar'
import Sidebar from './Sidebar'
import SearchBar from '../ui/SearchBar'
import useAuthStore from '../../store/useAuthStore'

export default function Layout() {
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-black/20 shadow-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,70,229,1),rgba(236,72,153,1),rgba(244,63,94,1))] text-lg font-bold text-white">M</div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Premium</p>
              <p className="text-xl font-semibold text-white">MUZO</p>
            </div>
          </div>

          <div className="flex-1 px-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/explore" className="transition hover:text-white">Explore</Link>
            <Link to="/library" className="transition hover:text-white">Library</Link>
            {token ? (
              <button onClick={logout} className="rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
                Logout
              </button>
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
      </header>

      <div className="container mx-auto grid gap-6 px-5 py-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar />

        <main className="space-y-8">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_25px_120px_-60px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Good evening</p>
                <h1 className="text-4xl font-semibold text-white">Premium playlists for your mood</h1>
              </div>
              <button className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-white/15">
                Explore now
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Mood</p>
                <p className="mt-4 text-lg font-semibold text-white">Chill Vibes</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">For you</p>
                <p className="mt-4 text-lg font-semibold text-white">Evening Drive</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Latest</p>
                <p className="mt-4 text-lg font-semibold text-white">New Releases</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Focus</p>
                <p className="mt-4 text-lg font-semibold text-white">Deep Work</p>
              </div>
            </div>
          </div>

          <section className="space-y-6">
            <Outlet />
          </section>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="container mx-auto px-5 py-3">
          <PlayerBar />
        </div>
      </footer>
    </div>
  )
}
