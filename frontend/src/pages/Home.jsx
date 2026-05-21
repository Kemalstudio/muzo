import { useMemo } from 'react'
import useTracks from '../hooks/useTracks'
import usePlaylists from '../hooks/usePlaylists'
import useRecentlyPlayed from '../hooks/useRecentlyPlayed'
import usePlayerStore from '../store/usePlayerStore'
import SectionHeading from '../components/ui/SectionHeading'
import TrendingSongCard from '../components/ui/TrendingSongCard'
import PlaylistCard from '../components/ui/PlaylistCard'
import RecentlyPlayedCard from '../components/history/RecentlyPlayedCard'

export default function Home() {
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks()
  const { playlists, loading: playlistsLoading, error: playlistsError } = usePlaylists()
  const { history } = useRecentlyPlayed(10)
  const play = usePlayerStore((s) => s.play)

  const trackList = useMemo(() => tracks?.slice(0, 6) || [], [tracks])
  const playlistList = useMemo(() => playlists?.slice(0, 5) || [], [playlists])
  const recentTracks = useMemo(() => history?.slice(0, 6).map((h) => h.track).filter(Boolean) || [], [history])

  return (
    <div className="space-y-12">
      {/* Hero Section with Featured Playlist */}
      {playlistList.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-8 backdrop-blur-sm">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                Featured
              </span>
            </div>
            <h2 className="mb-2 text-4xl font-bold text-white">
              {playlistList[0].name}
            </h2>
            <p className="mb-6 text-slate-300">
              {playlistList[0].description || 'Discover curated music just for you'}
            </p>
            <button
              onClick={() => play(playlistList[0])}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-indigo-500/50"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play Now
            </button>
          </div>
          {/* Background Decoration */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 blur-3xl opacity-10"></div>
        </div>
      )}

      {/* Recently Played Section */}
      {recentTracks.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">⏱️ Recently Played</h2>
              <p className="mt-2 text-slate-400">Continue where you left off</p>
            </div>
            <a
              href="/history"
              className="text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              View All →
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {recentTracks.map((track) => (
              <RecentlyPlayedCard
                key={track.id}
                track={track}
                onPlay={play}
              />
            ))}
          </div>
        </section>
      )}

      {/* Trending Songs Section */}
      <section>
        <SectionHeading
          title="🔥 Trending Now"
          subtitle="The hottest tracks everyone is listening to"
        />
        {tracksLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
          </div>
        ) : tracksError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="text-rose-400">Unable to load trending tracks.</p>
          </div>
        ) : trackList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trackList.map((track, index) => (
              <TrendingSongCard
                key={track.id}
                track={track}
                onPlay={play}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No trending tracks available</p>
          </div>
        )}
      </section>

      {/* Playlists Section */}
      <section>
        <SectionHeading
          title="✨ Your Playlists"
          subtitle="Curated collections and personal mixes"
        />
        {playlistsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
          </div>
        ) : playlistsError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6">
            <p className="text-rose-400">Unable to load playlists.</p>
          </div>
        ) : playlistList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {playlistList.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onPlay={play}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
            <p className="text-slate-400">No playlists available</p>
          </div>
        )}
      </section>

      {/* All Tracks Section */}
      {trackList.length < (tracks?.length || 0) && (
        <section>
          <SectionHeading
            title="🎵 All Tracks"
            subtitle="Browse our complete music library"
          />
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {tracks?.map((track) => (
              <div
                key={track.id}
                className="group rounded-2xl border border-slate-700 bg-slate-950 p-4 transition hover:border-indigo-500 hover:bg-slate-900"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 text-xs uppercase tracking-[0.32em] text-slate-500">
                      Track
                    </div>
                    <h4 className="font-semibold text-white group-hover:text-indigo-400">
                      {track.title}
                    </h4>
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-400">{track.artist}</p>
                <button
                  onClick={() => play(track)}
                  className="w-full rounded-full bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
