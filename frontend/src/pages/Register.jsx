import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services'
import useAuthStore from '../store/useAuthStore'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    try {
      const { token, user } = await register({ name, email, password })
      setAuth(token, user)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-indigo-400/80">Create your experience</p>
          <h1 className="text-4xl font-semibold text-white">Join MUZO today</h1>
          <p className="max-w-xl text-slate-400">
            Create your profile, save playlists and listen to your favorite tracks in a sleek, premium player.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            className="w-full rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110"
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 text-sm text-slate-400">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white hover:text-indigo-300">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
