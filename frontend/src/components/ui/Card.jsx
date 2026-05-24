export default function Card({ children, className = '' }) {
  return (
    <div className={"spotify-card rounded-3xl p-5 " + className}>
      {children}
    </div>
  )
}




