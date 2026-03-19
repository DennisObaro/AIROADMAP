import type { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (id: string | null) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-150 cursor-pointer ${
          activeCategory === null
            ? 'bg-accent/10 text-accent'
            : 'text-muted hover:text-text bg-surface-raised hover:bg-surface-hover'
        }`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors duration-150 cursor-pointer ${
            activeCategory === cat.id
              ? 'bg-accent/10 text-accent'
              : 'text-muted hover:text-text bg-surface-raised hover:bg-surface-hover'
          }`}
        >
          <span className="mr-1 opacity-40">{cat.icon}</span>
          {cat.title}
        </button>
      ))}
    </div>
  )
}
