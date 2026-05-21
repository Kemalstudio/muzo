import { useMemo } from 'react'
import useGenres from '../hooks/useGenres'
import useArtists from '../hooks/useArtists'
import useAlbums from '../hooks/useAlbums'
import usePlayerStore from '../store/usePlayerStore'
import SectionHeading from '../components/ui/SectionHeading'
import GenreCard from '../components/ui/GenreCard'
import ArtistCard from '../components/ui/ArtistCard'
import AlbumCard from '../components/ui/AlbumCard'

export default function Explore() {
  const { genres, loading: genresLoading, error: genresError } = useGenres()
  const { artists, loading: artistsLoading, error: artistsError } = useArtists()
  const { albums, loading: albumsLoading, error: albumsError } = useAlbums()
  const play = usePlayerStore((s) => s.play)

  const genreList = useMemo(() => genres?.slice(0, 6) || [], [genres])
  const artistList = useMemo(() => artists?.slice(0, 5) || [], [artists])
  const albumList = useMemo(() => albums?.slice(0, 6) || [], [albums])

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold text-white">🎵 Explore Music</h1>
        <p className="text-lg text-slate-400">
          Discover new genres, artists, and albums
        </p>
      </div>

      {/* Genres Section */}
      <section>
        <SectionHeading
          title="📚 Browse Genres"
          subtitle="Explore music by genre and find what speaks to you"
        />
        {genresLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
          </div>
        ) : genresError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="text-rose-400">Unable to load genres.</p>
          </div>
        ) : genreList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {genreList.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No genres available</p>
          </div>
        )}
      </section>

      {/* Top Artists Section */}
      <section>
        <SectionHeading
          title="🌟 Top Artists"
          subtitle="Follow your favorite artists and get their latest releases"
        />
        {artistsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
          </div>
        ) : artistsError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="text-rose-400">Unable to load artists.</p>
          </div>
        ) : artistList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {artistList.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onPlay={play} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No artists available</p>
          </div>
        )}
      </section>

      {/* New Releases - Albums Section */}
      <section>
        <SectionHeading
          title="🎁 New Releases"
          subtitle="Check out the latest albums and EPs"
        />
        {albumsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
          </div>
        ) : albumsError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="text-rose-400">Unable to load albums.</p>
          </div>
        ) : albumList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albumList.map((album) => (
              <AlbumCard key={album.id} album={album} onPlay={play} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No albums available</p>
          </div>
        )}
      </section>

      {/* All Genres Grid */}
      {genreList.length < (genres?.length || 0) && (
        <section>
          <SectionHeading
            title="All Genres"
            subtitle="Browse our complete genre collection"
          />
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {genres?.map((genre) => (
              <div
                key={genre.id}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-4 transition hover:from-indigo-600/40 hover:to-purple-600/40"
              >
                <div className="relative z-10">
                  <h4 className="font-semibold text-white group-hover:text-indigo-300">
                    {genre.name}
                  </h4>
                  {genre.description && (
                    <p className="mt-1 text-xs text-slate-400">
                      {genre.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
