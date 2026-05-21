import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SearchBar() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative rounded-3xl border border-slate-700 bg-slate-950 shadow-lg shadow-black/20 transition focus-within:border-indigo-500 focus-within:shadow-indigo-500/20">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search songs, artists, albums..."
          className="w-full rounded-3xl border-0 bg-transparent px-6 py-3 text-white placeholder-slate-500 outline-none"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-slate-800 transition"
        >
          <svg
            className="h-5 w-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
