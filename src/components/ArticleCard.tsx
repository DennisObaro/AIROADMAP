import type { Article } from '../types'
import { DifficultyBadge } from './DifficultyBadge'

interface ArticleCardProps {
  article: Article
  isRead: boolean
  onToggleRead: () => void
  index: number
}

const sourceColors: Record<string, string> = {
  'Cursor Docs': 'text-accent-glow',
  'Anthropic Docs': 'text-amber',
  'Vercel Docs': 'text-sky',
  'OpenAI Docs': 'text-emerald',
  GitHub: 'text-text',
  'Vercel Blog': 'text-sky',
}

export function ArticleCard({ article, isRead, onToggleRead, index }: ArticleCardProps) {
  const staggerClass = index <= 8 ? `stagger-${Math.min(index + 1, 8)}` : ''
  const sourceColor = sourceColors[article.source] || 'text-muted'

  return (
    <div className={`group animate-fade-in-up ${staggerClass}`}>
      <div
        className={`bg-surface-raised rounded-2xl border p-5 transition-all duration-300 hover:border-border-bright hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(139,92,246,0.12)] ${
          isRead ? 'border-emerald/30' : 'border-border'
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-mono font-medium ${sourceColor}`}>{article.source}</span>
              <span className="text-border-bright">·</span>
              <span className="text-[11px] text-muted font-mono">{article.readTime}</span>
              {isRead && (
                <span className="text-[10px] font-mono bg-emerald/15 text-emerald px-1.5 py-0.5 rounded flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Read
                </span>
              )}
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-heading leading-snug hover:text-accent-glow transition-colors block"
            >
              {article.title}
            </a>
          </div>
          <button
            onClick={onToggleRead}
            title={isRead ? 'Mark as unread' : 'Mark as read'}
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isRead
                ? 'bg-emerald/15 text-emerald hover:bg-emerald/25'
                : 'bg-surface-hover text-muted hover:text-accent hover:bg-accent/10'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {isRead ? (
                <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              )}
            </svg>
          </button>
        </div>

        <p className="text-sm text-muted leading-relaxed mb-4">{article.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-mono text-muted/70 bg-surface px-2 py-0.5 rounded-md border border-border">
                {tag}
              </span>
            ))}
          </div>
          <DifficultyBadge difficulty={article.difficulty} />
        </div>
      </div>
    </div>
  )
}
