import { Link } from 'react-router-dom'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.18),transparent_14%),radial-gradient(circle_at_top_right,rgba(244,63,94,0.14),transparent_16%),linear-gradient(180deg,#020617_0%,#050912_100%)] text-white">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl spotify-card p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.95)] backdrop-blur-xl">
          <div className="mb-8 spotify-card p-5 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">MUZO</p>
                <h1 className="text-3xl font-semibold text-white">Premium music experience</h1>
              </div>
              <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-glow">
                Secure login
              </div>
            </div>
            <p className="text-sm text-slate-400">
              Access your personalized music library, playlists and recommendations in a polished, modern interface.
            </p>
          </div>

          {children}

          <div className="mt-6 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 text-sm text-slate-400">
            <p>
              Want to browse first?{' '}
              <Link to="/" className="font-semibold text-white hover:text-indigo-300">
                Go to the dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




