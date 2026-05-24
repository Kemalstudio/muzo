import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-vh-100 items-center justify-center py-5">
      <div className="spotify-card rounded-4 p-5 text-center" style={{ maxWidth: 520 }}>
        <h1 className="display-4 fw-bold text-white mb-3">404</h1>
        <p className="lead text-secondary mb-4">Sorry, we couldn't find that page.</p>
        <Link to="/" className="spotify-btn spotify-btn-secondary px-4 py-2 text-sm">
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}




