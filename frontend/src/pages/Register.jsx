import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
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
    <div className="max-w-md rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl shadow-black/20">
      <h1 className="text-3xl font-semibold text-white">Create account</h1>
      <p className="mt-2 text-sm text-slate-400">Sign up for MUZO and start streaming your favorite tracks.</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

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
          Sign Up
        </button>
      </form>

      <p className="mt-5 text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-white hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
