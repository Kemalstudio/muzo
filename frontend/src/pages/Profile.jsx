import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { updateUserProfile } from '../services/userService'
import SectionHeading from '../components/ui/SectionHeading'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      return
    }

    setName(user.name || '')
    setUsername(user.username || '')
    setEmail(user.email || '')
    setPreview(user.avatar_url || '')
  }, [user])

  const avatarPreview = useMemo(() => {
    if (avatar) {
      return URL.createObjectURL(avatar)
    }

    return preview
  }, [avatar, preview])

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setAvatar(file)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!user) {
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('username', username)
      if (avatar) {
        formData.append('avatar', avatar)
      }

      const updatedUser = await updateUserProfile(user.id, formData)
      updateUser(updatedUser)
      setPreview(updatedUser.avatar_url || '')
      setAvatar(null)
      setMessage('Profile updated successfully.')
    } catch (err) {
      const response = err.response?.data
      if (response?.errors) {
        const validationErrors = Object.values(response.errors).flat().join(' ')
        setError(validationErrors || 'Unable to update profile. Please try again.')
      } else {
        setError(response?.message || 'Unable to update profile. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const token = useAuthStore((state) => state.token)

  if (!user) {
    return (
      <div className="space-y-4">
        <SectionHeading title="Profile" subtitle="Sign in to manage your profile information." />
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          {token ? (
            <p>Loading your profile data...</p>
          ) : (
            <>
              <p>Please log in first, then return to update your profile.</p>
              <Link to="/login" className="mt-4 inline-block rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600">
                Go to login
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeading title="Profile" subtitle="Update your display name, username, and avatar." />

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-800 bg-slate-950 p-6 text-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-800 text-5xl font-semibold text-white">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
              )}
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">
              Upload avatar
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
            <p className="text-xs text-slate-500">Square images work best.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Display name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-slate-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-slate-500"
                placeholder="Enter a username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-slate-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
        </div>

        {message ? <div className="rounded-2xl bg-emerald-950/80 px-4 py-3 text-sm text-emerald-300">{message}</div> : null}
        {error ? <div className="rounded-2xl bg-rose-950/80 px-4 py-3 text-sm text-rose-300">{error}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
