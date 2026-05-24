import { useState } from 'react'

export default function Accordion({ items = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.title || index} className="glass-panel overflow-hidden rounded-[1.75rem] border border-white/10 shadow-glow">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-white transition hover:bg-white/5"
            >
              <span className="text-base font-semibold">{item.title}</span>
              <span className={`text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>
            <div
              className={`overflow-hidden px-5 transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
              aria-hidden={!isOpen}
            >
              <div className="text-slate-300 text-sm leading-7">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
