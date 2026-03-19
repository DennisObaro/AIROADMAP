interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in-up">
      <div className="text-5xl mb-5 opacity-15">{icon}</div>
      <h3 className="text-heading font-display font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm max-w-sm text-center leading-relaxed">{description}</p>
    </div>
  )
}
