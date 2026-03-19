import { useState, useRef, useEffect } from 'react'
import type { Category, Difficulty } from '../types'

interface FilterDropdownProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (id: string | null) => void
  activeDifficulty: Difficulty | null
  onDifficultyChange: (d: Difficulty | null) => void
}

const difficulties: { id: Difficulty; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

export function FilterDropdown({
  categories,
  activeCategory,
  onCategoryChange,
  activeDifficulty,
  onDifficultyChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const activeCount = (activeCategory ? 1 : 0) + (activeDifficulty ? 1 : 0)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function clearAll() {
    onCategoryChange(null)
    onDifficultyChange(null)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-colors duration-150 cursor-pointer border ${
          open || activeCount > 0
            ? 'bg-surface-raised border-border-bright text-heading'
            : 'bg-surface-raised border-border text-muted hover:text-text hover:border-border-bright'
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-60">
          <path d="M2 3.5H13M4 7.5H11M6 11.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        Filters
        {activeCount > 0 && (
          <span className="bg-accent text-white text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center -mr-1">
            {activeCount}
          </span>
        )}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`opacity-40 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}>
          <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-surface-raised border border-border rounded-2xl shadow-xl shadow-black/30 z-50 overflow-hidden">
          {/* Difficulty */}
          <div className="p-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.12em]">Difficulty</span>
              {activeDifficulty && (
                <button onClick={() => onDifficultyChange(null)} className="text-[10px] text-muted hover:text-text transition-colors cursor-pointer">
                  Clear
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
              {difficulties.map(d => (
                <button
                  key={d.id}
                  onClick={() => onDifficultyChange(activeDifficulty === d.id ? null : d.id)}
                  className={`flex-1 px-3 py-2 rounded-xl text-[11px] font-medium transition-colors duration-150 cursor-pointer ${
                    activeDifficulty === d.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-text bg-surface-hover'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-4 h-px bg-border" />

          {/* Category */}
          <div className="p-4 pt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-muted uppercase tracking-[0.12em]">Category</span>
              {activeCategory && (
                <button onClick={() => onCategoryChange(null)} className="text-[10px] text-muted hover:text-text transition-colors cursor-pointer">
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto">
              <button
                onClick={() => onCategoryChange(null)}
                className={`text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                  activeCategory === null
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                All categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(activeCategory === cat.id ? null : cat.id)}
                  className={`text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors duration-150 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-text hover:bg-surface-hover'
                  }`}
                >
                  <span className="mr-1.5 opacity-40">{cat.icon}</span>
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {activeCount > 0 && (
            <>
              <div className="mx-4 h-px bg-border" />
              <div className="p-3">
                <button
                  onClick={clearAll}
                  className="w-full px-3 py-2 rounded-xl text-[12px] font-medium text-muted hover:text-text hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
