interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
      <div className="text-5xl mb-4 opacity-30">{icon}</div>
      <h3 className="text-heading font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm max-w-sm text-center">{description}</p>
    </div>
  )
}
