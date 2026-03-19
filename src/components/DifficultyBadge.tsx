import type { Difficulty } from '../types'

const config: Record<Difficulty, { label: string; className: string }> = {
  beginner: { label: 'Beginner', className: 'bg-emerald/10 text-emerald border-emerald/20' },
  intermediate: { label: 'Intermediate', className: 'bg-amber/10 text-amber border-amber/20' },
  advanced: { label: 'Advanced', className: 'bg-rose/10 text-rose border-rose/20' },
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty]
  return (
    <span className={`inline-flex text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${className}`}>
      {label}
    </span>
  )
}
