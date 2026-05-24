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
    <form onSubmit={handleSubmit} className="w-100">
      <div className="input-group rounded-full overflow-hidden border border-white/10 bg-black bg-opacity-75">
        <span className="input-group-text bg-transparent border-0 text-white px-3">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search songs, artists, albums..."
          className="form-control bg-transparent border-0 text-white placeholder-white/50"
        />
        <button
          type="submit"
          className="spotify-btn spotify-btn-secondary rounded-full px-4 text-sm"
        >
          Search
        </button>
      </div>
    </form>
  )
}




