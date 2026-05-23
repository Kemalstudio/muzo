import { useState } from 'react'
import { Outlet } from 'react-router-dom'
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
          <Outlet />
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
