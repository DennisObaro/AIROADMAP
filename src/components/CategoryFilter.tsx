import type { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (id: string | null) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border ${
          activeCategory === null
            ? 'bg-accent/15 text-accent-glow border-accent/25'
            : 'text-muted hover:text-text bg-surface-raised hover:bg-surface-hover border-border'
        }`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border ${
            activeCategory === cat.id
              ? 'bg-accent/15 text-accent-glow border-accent/25'
              : 'text-muted hover:text-text bg-surface-raised hover:bg-surface-hover border-border'
          }`}
        >
          <span className="mr-1.5 opacity-60">{cat.icon}</span>
          {cat.title}
        </button>
      ))}
    </div>
  )
}
