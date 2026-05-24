import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PlayerBar from '../player/PlayerBar'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileMenu from './MobileMenu'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-vh-100 bg-black text-white">
      <Header mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={() => setMobileMenuOpen((state) => !state)} />

      <div className="container-fluid px-3 px-xl-4 py-4 pb-24">
        <div className="row gx-4">
          <div className="col-xl-2">
            <Sidebar />
          </div>
          <div className="col-xl-10">
            <main className="spotify-page-content">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <footer className="fixed bottom-0 left-0 right-0 z-50 border-top border-white/10 bg-black bg-opacity-95 backdrop-blur-xl py-3">
        <div className="container-fluid px-3 px-xl-4">
          <PlayerBar />
        </div>
      </footer>
    </div>
  )
}
