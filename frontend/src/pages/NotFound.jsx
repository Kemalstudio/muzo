import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-300">Page not found.</p>
      <Link to="/" className="text-indigo-300">Go back home</Link>
    </div>
  )
}
