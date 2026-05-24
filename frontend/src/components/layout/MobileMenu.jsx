import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

export default function MobileMenu({ open, onClose }) {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  if (!open) {
    return null
  }

  return (
    <div className="lg:hidden spotify-card rounded-4 border-t border-slate-800 px-5 py-4">
      <div className="space-y-2">
        <Link
          to="/"
          onClick={onClose}
          className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          Home
        </Link>
        <Link
          to="/explore"
          onClick={onClose}
          className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          Explore
        </Link>
        <Link
          to="/library"
          onClick={onClose}
          className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          Library
        </Link>
        {token && user ? (
          <>
            <Link
              to="/profile"
              onClick={onClose}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                onClose()
                logout()
              }}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-900"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={onClose}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}




