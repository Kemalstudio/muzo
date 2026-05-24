import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useTracks from '../hooks/useTracks'
import usePlaylists from '../hooks/usePlaylists'
import useRecentlyPlayed from '../hooks/useRecentlyPlayed'
import usePlayerStore from '../store/usePlayerStore'

const getSafeArray = (data) => {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') {
    if (Array.isArray(data.data)) return data.data
    if (Array.isArray(data.tracks)) return data.tracks
    if (Array.isArray(data.playlists)) return data.playlists
  }
  return []
}

const friendActivity = [
  { name: 'Amber Holmes', track: 'Dutch Kiss • Inner Mix', accent: 'bg-green-600' },
  { name: 'Mia Jones', track: 'Ash • White Desert', accent: 'bg-amber-500' },
  { name: 'Maria Diaz', track: 'PK • Parachute', accent: 'bg-rose-500' },
  { name: 'Milton Heig', track: 'Dutch Kiss • Inner Mix', accent: 'bg-cyan-500' },
  { name: 'Dany Brooks', track: 'PK • Parachute', accent: 'bg-indigo-600' },
]

const fallbackCards = [
  {
    title: 'Release Radar',
    description: 'Updates every friday',
    label: '28 Tracks',
    accent: 'bg-gradient-1',
  },
  {
    title: 'Daily Mix',
    description: 'Coldplay, PK, Ash',
    label: '12 Tracks',
    accent: 'bg-gradient-2',
  },
  {
    title: 'Liked Songs',
    description: 'Your favorite tracks',
    label: '289 Tracks',
    accent: 'bg-gradient-3',
  },
  {
    title: 'Lowkey Tech',
    description: 'Chill techno & minimal',
    label: '55.4k Followers',
    accent: 'bg-gradient-4',
  },
]

export default function Home() {
  const { tracks } = useTracks()
  const { playlists } = usePlaylists()
  const { history } = useRecentlyPlayed(10)
  const play = usePlayerStore((s) => s.play)

  const playCounts = [274, 244, 208, 192, 180, 166]
  const safeTracks = useMemo(() => getSafeArray(tracks), [tracks])
  const safePlaylists = useMemo(() => getSafeArray(playlists), [playlists])
  const safeHistory = useMemo(() => getSafeArray(history), [history])

  const trackList = useMemo(() => safeTracks.slice(0, 6), [safeTracks])
  const playlistList = useMemo(() => safePlaylists.slice(0, 5), [safePlaylists])
  const recentTracks = useMemo(() => safeHistory.slice(0, 6).map((h) => h?.track || {}).filter(Boolean), [safeHistory])

  const heroCards = playlistList.slice(0, 4).map((playlist, index) => ({
    title: playlist.name || `Playlist ${index + 1}`,
    description: playlist.description || 'Handpicked for your mood',
    label: `${playlist.tracks?.length || 28} Tracks`,
    accent: [`bg-gradient-1`, `bg-gradient-2`, `bg-gradient-3`, `bg-gradient-4`][index % 4],
    action: () => play(playlist),
  }))

  const heroDisplay = heroCards.length ? heroCards : fallbackCards

  return (
    <div className="space-y-8">
      <section className="glass-panel p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="space-y-6">
            <span className="badge-glow uppercase tracking-[0.32em] text-xs">Premium Experience</span>
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">A more polished, premium music experience.</h1>
              <p className="text-slate-300 leading-8">Enjoy a modern listening interface with glassmorphism panels, soft neon accents, and fluid playback interactions designed for the next generation of music lovers.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="spotify-btn spotify-btn-primary">Focus mode</button>
              <button className="spotify-btn spotify-btn-secondary">Night lounge</button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-indigo-700 via-slate-950 to-cyan-700/20 p-6 shadow-glow hero-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_40%)] pointer-events-none" />
            <div className="relative flex h-full flex-col justify-between gap-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.32em] text-slate-200/75">Featured mix</span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">Live</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/10 text-3xl font-black">M</div>
                <div>
                  <p className="text-sm text-slate-200/80">Velvet Sessions</p>
                  <h2 className="text-3xl font-semibold text-white">Late night ambient and cinematic beats</h2>
                  <p className="mt-2 text-sm text-slate-300">Curated for smooth listening with deep bass and warm textures.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="spotify-btn spotify-btn-primary">Play now</button>
                <button className="spotify-btn spotify-btn-light text-sm">Add to library</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="glass-panel p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-slate-400 uppercase text-xs tracking-[0.28em]">Trending tracks</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Hot sounds for today</h2>
            </div>
            <Link to="/explore" className="spotify-btn spotify-btn-secondary">Browse catalog</Link>
          </div>

          <div className="mt-6 space-y-4">
            {trackList.map((track, index) => (
              <button
                key={track.id || `${track.title}-${index}`}
                type="button"
                onClick={() => play(track)}
                className="glass-panel flex w-full items-center justify-between gap-4 p-4 hover:-translate-y-px transition-transform"
              >
                <div>
                  <div className="text-xs text-slate-400">Track #{index + 1}</div>
                  <h3 className="text-lg font-semibold text-white">{track.title}</h3>
                  <p className="text-sm text-slate-400">{track.artist || 'Unknown artist'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/90">{track.playCount || playCounts[index]}k</span>
                  <span className="icon-button bg-gradient-to-r from-indigo-600 to-purple-600 text-white">▶</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 uppercase text-xs tracking-[0.28em]">Recently played</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Continue your flow</h3>
              </div>
              <button className="spotify-btn spotify-btn-secondary text-sm">View all</button>
            </div>

            <div className="mt-6 space-y-3">
              {recentTracks.slice(0, 4).map((track, index) => (
                <button
                  key={`recent-${index}`}
                  type="button"
                  onClick={() => play(track)}
                  className="glass-panel flex w-full items-center justify-between gap-4 p-4 hover:translate-y-[-1px] transition-transform"
                >
                  <div>
                    <h4 className="font-semibold text-white">{track.title || track.name || 'Unknown Track'}</h4>
                    <p className="text-sm text-slate-400">{track.artist || track.artist_name || 'Unknown artist'}</p>
                  </div>
                  <span className="icon-button bg-gradient-to-r from-indigo-600 to-purple-600 text-white">▶</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 uppercase text-xs tracking-[0.28em]">Friends Activity</p>
                <h3 className="mt-2 text-xl font-semibold text-white">What your circle is listening to</h3>
              </div>
              <button className="spotify-btn spotify-btn-secondary text-sm">See all</button>
            </div>

            <div className="mt-6 space-y-3">
              {friendActivity.map((friend, index) => (
                <div key={`${friend.name}-${index}`} className="glass-panel flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-3xl ${friend.accent} text-white font-semibold`}>{friend.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}</div>
                    <div>
                      <p className="font-semibold text-white">{friend.name}</p>
                      <p className="text-sm text-slate-400">{friend.track}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-2 text-xs text-emerald-200">Online</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {heroDisplay.map((card) => (
          <div key={card.title} className="glass-panel p-5 shadow-glow hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="rounded-3xl bg-white/10 p-3 text-white">
                <span className="text-xs uppercase tracking-[0.28em]">Play</span>
              </div>
              <span className="text-xs rounded-full bg-white/10 px-3 py-1 text-slate-200">{card.label}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-slate-400 mb-5">{card.description}</p>
            <button type="button" onClick={card.action} className="spotify-btn spotify-btn-primary w-full">Play</button>
          </div>
        ))}
      </section>
    </div>
  )
}



