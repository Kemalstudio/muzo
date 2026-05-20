import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import useAuthStore from '../store/useAuthStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((state) => state.setAuth)

  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)

    try {
      const { token, user } = await login({ email, password })
      setAuth(token, user)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-black/20">
      <h1 className="text-3xl font-semibold text-white">Login</h1>
      <p className="mt-2 text-sm text-slate-400">Access your MUZO account with your email and password.</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button className="w-full rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400" type="submit">
          Sign In
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-400">
        New to MUZO?{' '}
        <Link to="/register" className="font-semibold text-white hover:underline">
          Register now
        </Link>
      </p>
    </div>
  )
}
