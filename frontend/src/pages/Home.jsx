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
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks()
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
    <div className="spotify-page container-fluid px-0 px-xl-3">
      <section className="mb-5 px-3 px-xl-0">
        <div className="spotify-card p-4 p-xl-5 rounded-4">
          <div className="flex flex-col flex-lg-row items-start lg:items-center justify-between gap-3">
            <div className="max-w-3xl">
              <span className="badge-soft rounded-full py-2 px-3 text-uppercase letter-spacing-sm mb-3 inline-block">Welcome back</span>
              <h1 className="display-6 fw-bold text-white mb-3">Your next music experience</h1>
              <p className="text-secondary mb-0">A polished dark interface with premium playlists, live updates and seamless playback designed for modern listeners.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="spotify-btn spotify-btn-secondary px-4 text-sm">Minimal</button>
              <button className="spotify-btn spotify-btn-secondary px-4 text-sm">House</button>
              <button className="spotify-btn spotify-btn-secondary px-4 text-sm">Chill</button>
            </div>
          </div>
        </div>
      </section>

      <section className="row gx-3 gy-3 mb-4 px-3 px-xl-0">
        {heroDisplay.map((card) => (
          <div key={card.title} className="col-12 col-md-6 col-xl-3">
            <div className={`spotify-hero-card ${card.accent} flex flex-col justify-between p-4 text-white rounded-4 shadow-lg`}>
              <div className="mb-3">
                <span className="badge-soft bg-black bg-opacity-50 text-white rounded-full mb-2 inline-flex items-center gap-2">
                  <span className="dot rounded-full bg-white/75"></span>
                  {card.label}
                </span>
                <h3 className="h5 fw-bold mb-2">{card.title}</h3>
                <p className="text-secondary mb-0">{card.description}</p>
              </div>
              <button type="button" onClick={card.action} className="spotify-btn spotify-btn-primary px-4 text-sm font-semibold mt-3">
                Play
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="row gx-3 gy-4 px-3 px-xl-0">
        <div className="col-xl-8">
          <div className="spotify-card p-4 mb-4">
            <div className="flex flex-col flex-md-row items-start align-items-md-center justify-between gap-3 mb-4">
              <div>
                <p className="text-secondary small text-uppercase mb-1">Tracks of the Week</p>
                <h2 className="h4 fw-bold text-white mb-0">Latest hits and burning playlists</h2>
              </div>
              <Link to="/explore" className="spotify-btn spotify-btn-secondary px-4 text-sm">
                See all
              </Link>
            </div>

            {tracksLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status"></div>
              </div>
            ) : tracksError ? (
              <div className="alert alert-danger bg-opacity-10 border-0 text-secondary" role="alert">
                Unable to load tracks.
              </div>
            ) : ( 
              <div className="list-group list-group-flush">
                {trackList.map((track, index) => (
                  <button
                    key={track.id || `${track.title}-${index}`}
                    type="button"
                    onClick={() => play(track)}
                    className="list-group-item list-group-item-action bg-transparent border-0 px-0 py-3 text-white rounded-4 mb-2 spotify-list-item"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="small text-secondary mb-1">#{index + 1}</div>
                        <h3 className="h6 font-semibold mb-1 text-white">{track.title}</h3>
                        <p className="mb-0 text-secondary">{track.artist || 'Unknown artist'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge-soft bg-white/10 text-white rounded-full py-2 px-3">{track.playCount || playCounts[index]}k</span>
                        <span className="spotify-btn spotify-btn-secondary rounded-full p-2 text-sm">
                          ▶
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="row gx-3 gy-3">
            {playlistList.slice(0, 4).map((playlist, index) => (
              <div key={playlist.id || index} className="col-12 col-md-6">
                <div className="spotify-card p-3 rounded-4 overflow-hidden position-relative">
                  <div className="flex flex-col gap-3">
                    <span className="badge-soft bg-white/10 text-white rounded-full py-2 px-3 align-self-start">Playlist</span>
                    <h3 className="h6 font-semibold text-white mb-1">{playlist.name}</h3>
                    <p className="mb-0 text-secondary">{playlist.description || 'Curated collection for your next session.'}</p>
                  </div>
                  <div className="hero-accent position-absolute top-0 inset-e-0 rounded-full opacity-50"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-4">
          <div className="spotify-card p-4 rounded-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-secondary small text-uppercase mb-1">Live</p>
                <h3 className="h5 fw-bold mb-0 text-white">Friends Activity</h3>
              </div>
              <button className="spotify-btn spotify-btn-secondary px-3 text-sm">View all</button>
            </div>

            <div className="list-group list-group-flush">
              {friendActivity.map((friend, index) => (
                <div key={`${friend.name}-${index}`} className="list-group-item bg-transparent border-0 px-0 py-3 spotify-list-item rounded-4 mb-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full ${friend.accent} flex items-center justify-center text-black fw-bold`} style={{ width: 44, height: 44 }}>
                        {friend.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="mb-1 font-semibold text-white">{friend.name}</p>
                        <p className="mb-0 small text-secondary">{friend.track}</p>
                      </div>
                    </div>
                    <span className="badge-soft bg-green-600 bg-opacity-10 text-green-400 rounded-full py-2 px-3">Online</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recentTracks.length > 0 && (
            <div className="spotify-card p-4 rounded-4 mt-4">
              <p className="font-semibold text-white mb-3">Continue listening</p>
              <div className="list-group list-group-flush">
                {recentTracks.slice(0, 3).map((track, index) => (
                  <div
                    key={`recent-${index}`}
                    className="list-group-item bg-transparent border-0 px-0 py-3 spotify-list-item rounded-4 mb-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="h6 font-semibold text-white mb-1">{track.title || track.name || 'Unknown Track'}</h4>
                        <p className="mb-0 text-secondary">{track.artist || track.artist_name || 'Unknown artist'}</p>
                      </div>
                      <button type="button" onClick={() => play(track)} className="spotify-btn spotify-btn-secondary rounded-full p-2 text-sm">
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="spotify-card p-4 rounded-4 mt-4 text-secondary">
            <p className="font-semibold text-white mb-2">Quick filters</p>
            <div className="flex flex-wrap gap-2">
              <button className="spotify-btn spotify-btn-secondary px-3 text-sm">Pop</button>
              <button className="spotify-btn spotify-btn-secondary px-3 text-sm">Hip-hop</button>
              <button className="spotify-btn spotify-btn-secondary px-3 text-sm">Chill</button>
              <button className="spotify-btn spotify-btn-secondary px-3 text-sm">Techno</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 px-xl-0 pb-5">
        <div className="spotify-card p-4 rounded-4 border border-white/10 shadow-lg">
          <div className="flex flex-col flex-md-row items-center justify-between gap-3">
            <div>
              <h3 className="h5 fw-bold text-white mb-1">Ready for a deeper session?</h3>
              <p className="mb-0 text-secondary">Explore the full catalog or create a fresh playlist from your favorites.</p>
            </div>
            <Link to="/search" className="spotify-btn spotify-btn-primary px-4 text-sm">
              Discover now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}



