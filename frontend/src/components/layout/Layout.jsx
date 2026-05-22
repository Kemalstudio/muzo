import { Outlet, useState } from 'react'
import PlayerBar from '../player/PlayerBar'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_18%),#020617] text-white">
      <Header mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={() => setMobileMenuOpen((state) => !state)} />

      <div className="container mx-auto grid gap-6 px-5 py-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar />

        <main className="space-y-8">
          <div className="glass-panel rounded-4xl p-6 ring-1 ring-white/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Good evening</p>
                <h1 className="text-4xl font-semibold text-white">Premium playlists for your mood</h1>
              </div>
              <button className="glow-button rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20">
                Explore now
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="glass-card p-5 anim-fade-up delay-100">
                <p className="text-sm text-slate-400">Mood</p>
                <p className="mt-4 text-lg font-semibold text-white">Chill Vibes</p>
              </div>
              <div className="glass-card p-5 anim-fade-up delay-200">
                <p className="text-sm text-slate-400">For you</p>
                <p className="mt-4 text-lg font-semibold text-white">Evening Drive</p>
              </div>
              <div className="glass-card p-5 anim-fade-up delay-100">
                <p className="text-sm text-slate-400">Latest</p>
                <p className="mt-4 text-lg font-semibold text-white">New Releases</p>
              </div>
              <div className="glass-card p-5 anim-fade-up delay-200">
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

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="container mx-auto px-5 py-3">
          <PlayerBar />
        </div>
      </footer>
    </div>
  )
}
