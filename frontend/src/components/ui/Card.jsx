export default function Card({ children, className = '' }) {
  return (
    <div className={"rounded-3xl border border-slate-700 bg-slate-950 p-5 shadow-xl shadow-black/20 " + className}>
      {children}
    </div>
  )
}
