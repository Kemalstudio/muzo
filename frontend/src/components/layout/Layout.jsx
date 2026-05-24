import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PlayerBar from '../player/PlayerBar'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_16%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_14%),linear-gradient(180deg,#050610, #02030a)] text-white">
      <Header mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={() => setMobileMenuOpen((state) => !state)} />

      <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-6 xl:px-8">
        <div className="xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-6">
          <aside className="hidden xl:block">
            <Sidebar />
          </aside>

          <main className="mt-6 xl:mt-0 min-h-[calc(100vh-190px)]">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/60 backdrop-blur-xl px-4 py-3">
        <div className="mx-auto max-w-[1600px]">
          <PlayerBar />
        </div>
      </footer>
    </div>
  )
}




