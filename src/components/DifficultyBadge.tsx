import type { Difficulty } from '../types'

const config: Record<Difficulty, { label: string; className: string }> = {
  beginner: { label: 'Beginner', className: 'bg-emerald/8 text-emerald' },
  intermediate: { label: 'Intermediate', className: 'bg-amber/8 text-amber' },
  advanced: { label: 'Advanced', className: 'bg-rose/8 text-rose' },
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty]
  return (
    <span className={`inline-flex text-[9px] font-mono font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md ${className}`}>
      {label}
    </span>
  )
}
