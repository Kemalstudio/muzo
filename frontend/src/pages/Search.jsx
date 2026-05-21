import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import usePlayerStore from '../store/usePlayerStore'
import SectionHeading from '../components/ui/SectionHeading'
import TrackCard from '../components/ui/TrackCard'
import ArtistCard from '../components/ui/ArtistCard'
import AlbumCard from '../components/ui/AlbumCard'
import GenreCard from '../components/ui/GenreCard'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const { query, setQuery, results, loading, error } = useSearch(initialQuery)
  const play = usePlayerStore((s) => s.play)

  const handleSearch = (value) => {
    setQuery(value)
    if (value.trim()) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  const trackResults = useMemo(() => results.tracks || [], [results.tracks])
  const artistResults = useMemo(() => results.artists || [], [results.artists])
  const albumResults = useMemo(() => results.albums || [], [results.albums])
  const genreResults = useMemo(() => results.genres || [], [results.genres])

  const hasResults = trackResults.length > 0 || artistResults.length > 0 || albumResults.length > 0 || genreResults.length > 0

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white">🔍 Search Music</h1>
          <p className="mt-2 text-slate-400">
            Find songs, artists, albums, and genres
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="relative rounded-3xl border border-slate-700 bg-slate-950 shadow-lg shadow-black/20 transition focus-within:border-indigo-500 focus-within:shadow-indigo-500/20">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search songs, artists, albums, genres..."
              className="w-full rounded-3xl border-0 bg-transparent px-6 py-4 text-white placeholder-slate-500 outline-none"
            />
            <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2">
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-600"></div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
          <p className="text-rose-400">Something went wrong. Please try again.</p>
        </div>
      )}

      {!query.trim() && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-slate-400">Start typing to search for music</p>
        </div>
      )}

      {query.trim() && !hasResults && !loading && (
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-400">No results found for "{query}"</p>
        </div>
      )}

      {hasResults && (
        <div className="space-y-12">
          {/* Tracks Results */}
          {trackResults.length > 0 && (
            <section>
              <SectionHeading
                title={`🎵 Songs (${trackResults.length})`}
                subtitle="Search results for tracks"
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {trackResults.slice(0, 6).map((track) => (
                  <TrackCard key={track.id} track={track} onPlay={play} />
                ))}
              </div>
              {trackResults.length > 6 && (
                <div className="mt-6 text-center">
                  <button className="rounded-full border border-indigo-600 px-8 py-3 font-semibold text-indigo-400 transition hover:bg-indigo-600/10">
                    View all {trackResults.length} results
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Artists Results */}
          {artistResults.length > 0 && (
            <section>
              <SectionHeading
                title={`🌟 Artists (${artistResults.length})`}
                subtitle="Search results for artists"
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {artistResults.slice(0, 5).map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} onPlay={play} />
                ))}
              </div>
              {artistResults.length > 5 && (
                <div className="mt-6 text-center">
                  <button className="rounded-full border border-indigo-600 px-8 py-3 font-semibold text-indigo-400 transition hover:bg-indigo-600/10">
                    View all {artistResults.length} results
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Albums Results */}
          {albumResults.length > 0 && (
            <section>
              <SectionHeading
                title={`💿 Albums (${albumResults.length})`}
                subtitle="Search results for albums"
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {albumResults.slice(0, 6).map((album) => (
                  <AlbumCard key={album.id} album={album} onPlay={play} />
                ))}
              </div>
              {albumResults.length > 6 && (
                <div className="mt-6 text-center">
                  <button className="rounded-full border border-indigo-600 px-8 py-3 font-semibold text-indigo-400 transition hover:bg-indigo-600/10">
                    View all {albumResults.length} results
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Genres Results */}
          {genreResults.length > 0 && (
            <section>
              <SectionHeading
                title={`📚 Genres (${genreResults.length})`}
                subtitle="Search results for genres"
              />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {genreResults.slice(0, 6).map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
              {genreResults.length > 6 && (
                <div className="mt-6 text-center">
                  <button className="rounded-full border border-indigo-600 px-8 py-3 font-semibold text-indigo-400 transition hover:bg-indigo-600/10">
                    View all {genreResults.length} results
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  )
}
