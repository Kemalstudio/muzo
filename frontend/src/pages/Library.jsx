import useLibrary from '../hooks/useLibrary'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'

export default function Library() {
  const { library, loading, error } = useLibrary()

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Your Library"
        subtitle="Save favorites and access your curated collection instantly."
      />

      {loading ? (
        <div className="spotify-card p-6 rounded-4 text-center text-secondary">Loading library...</div>
      ) : error ? (
        <div className="spotify-card p-6 rounded-4 border-danger border bg-rose-950/30 text-rose-300">
          Unable to load library items.
        </div>
      ) : library.length === 0 ? (
        <div className="spotify-card p-6 rounded-4 text-center text-secondary">
          No items yet. Save songs and playlists to your library for quick access.
        </div>
      ) : (
        <div className="row g-4">
          {library.map((item) => (
            <div key={item.id} className="col-12 col-md-6">
              <Card className="h-100">
                <div className="fw-semibold text-white">{item.title}</div>
                <div className="text-secondary">{item.artist}</div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
