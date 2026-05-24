export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-6 section-heading">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-2 text-slate-400">{subtitle}</p> : null}
      </div>
    </div>
  )
}




