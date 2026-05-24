import { useState, useRef, useEffect } from 'react'
import AddToPlaylistModal from './AddToPlaylistModal'

export default function TrackActionsMenu({ track, placement = 'bottom' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleAddToPlaylist = () => {
    setIsOpen(false)
    setShowAddToPlaylist(true)
  }

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="More options"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.5 1.5H9.5V3.5H10.5V1.5ZM10.5 9.5H9.5V17.5H10.5V9.5ZM10.5 5.5H9.5V7.5H10.5V5.5Z" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className={`absolute right-0 ${
              placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            } z-40 min-w-48 rounded-2xl border border-slate-700 bg-slate-900 shadow-lg`}
          >
            <button
              onClick={handleAddToPlaylist}
              className="block w-full rounded-t-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-slate-800 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <svg
                className="mb-1 inline-block h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add to Playlist
            </button>
            <button
              onClick={() => {
                // Copy track link
                const url = `${window.location.origin}/track/${track.id}`
                navigator.clipboard.writeText(url)
                setIsOpen(false)
              }}
              className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              <svg
                className="mb-1 inline-block h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Copy Link
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                // Add to queue functionality
              }}
              className="block w-full rounded-b-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              <svg
                className="mb-1 inline-block h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add to Queue
            </button>
          </div>
        )}
      </div>

      {/* Add to Playlist Modal */}
      <AddToPlaylistModal
        track={track}
        isOpen={showAddToPlaylist}
        onClose={() => setShowAddToPlaylist(false)}
      />
    </>
  )
}




