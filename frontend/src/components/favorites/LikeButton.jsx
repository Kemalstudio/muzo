import { useState } from 'react'
import useFavorite from '../../hooks/useFavorite'

export default function LikeButton({ track, className = '', size = 'md' }) {
  const { isFavorited, toggleFavorite } = useFavorite(track)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = async () => {
    setIsAnimating(true)
    await toggleFavorite()
    setTimeout(() => setIsAnimating(false), 600)
  }

  const sizeClasses = {
    sm: 'h-4 w-4 p-1',
    md: 'h-5 w-5 p-2',
    lg: 'h-6 w-6 p-2',
  }

  const containerClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-full transition-all duration-300 hover:bg-rose-600/30 ${
        isFavorited
          ? 'text-rose-500 hover:text-rose-400'
          : 'text-slate-400 hover:text-rose-500'
      } ${containerClasses[size]} ${className}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${sizeClasses[size]} transition-transform duration-300 ${
          isAnimating && isFavorited ? 'scale-125' : 'scale-100'
        }`}
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isFavorited ? 0 : 2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}
