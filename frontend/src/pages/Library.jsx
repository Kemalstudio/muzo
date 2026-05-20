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
        <div className="text-slate-400">Loading library...</div>
      ) : error ? (
        <div className="text-rose-400">Unable to load library items.</div>
      ) : library.length === 0 ? (
        <div className="text-slate-400">No items yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {library.map((item) => (
            <Card key={item.id}>
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-sm text-slate-400">{item.artist}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
