import { Link } from 'react-router-dom'

const genreColors = {
  rock: 'from-red-600 to-orange-600',
  pop: 'from-pink-600 to-rose-600',
  jazz: 'from-amber-600 to-yellow-600',
  classical: 'from-purple-600 to-indigo-600',
  electronic: 'from-cyan-600 to-blue-600',
  hiphop: 'from-gray-600 to-slate-600',
  country: 'from-yellow-600 to-orange-600',
  rnb: 'from-purple-600 to-pink-600',
  indie: 'from-green-600 to-emerald-600',
  metal: 'from-gray-800 to-black',
}

export default function GenreCard({ genre }) {
  const colorGradient =
    genreColors[genre.name?.toLowerCase()] ||
    'from-indigo-600 to-purple-600'

  return (
    <Link to={`/genre/${genre.id}`}>
      <div className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${colorGradient} p-6 transition duration-300 hover:shadow-lg hover:shadow-black/50`}>
        <div className="relative z-10">
          <div className="mb-4">
            <svg
              className="h-12 w-12 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">{genre.name}</h3>
          <p className="mt-2 text-sm text-white/80">
            {genre.description || 'Explore this genre'}
          </p>
        </div>
        {/* Floating Icon Background */}
        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition">
          <svg
            className="h-32 w-32 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
