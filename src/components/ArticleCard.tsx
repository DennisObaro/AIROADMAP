import type { Article } from '../types'
import { DifficultyBadge } from './DifficultyBadge'

interface ArticleCardProps {
  article: Article
  isRead: boolean
  onToggleRead: () => void
  index: number
}

const sourceColors: Record<string, string> = {
  'Cursor Docs': 'text-accent',
  'Anthropic Docs': 'text-amber',
  'Vercel Docs': 'text-sky',
  'Vercel Blog': 'text-sky',
  'OpenAI Docs': 'text-peach',
  'OpenAI Blog': 'text-peach',
  'Google AI Blog': 'text-sky',
  GitHub: 'text-heading',
  'GitHub Blog': 'text-heading',
  'Figma Blog': 'text-rose',
  'MCP Docs': 'text-accent',
  'Level Up Coding': 'text-amber',
  'DEV Community': 'text-accent',
  InfoQ: 'text-amber',
  'DigitalOcean Community': 'text-sky',
  'Smashing Magazine': 'text-rose',
  Awwwards: 'text-peach',
  'Creative Bloq': 'text-amber',
  'daily.dev': 'text-accent',
  'LangChain Blog': 'text-accent',
  'MIT News AI': 'text-heading',
  'Reddit UXDesign': 'text-rose',
  Medium: 'text-amber',
  'Toools Design': 'text-accent',
  Muzli: 'text-peach',
  'Veza Digital': 'text-sky',
  B12: 'text-accent',
  Komposo: 'text-amber',
  Grazitti: 'text-sky',
  Prototypr: 'text-rose',
  'UX Pilot': 'text-accent',
  Figma: 'text-rose',
  'UX Planet': 'text-peach',
  Zignuts: 'text-sky',
  'Codevolution (X)': 'text-sky',
  'X (@jspujji)': 'text-sky',
}

export function ArticleCard({ article, isRead, onToggleRead, index }: ArticleCardProps) {
  const staggerClass = index <= 8 ? `stagger-${Math.min(index + 1, 8)}` : ''
  const sourceColor = sourceColors[article.source] || 'text-muted'

  return (
    <div className={`group animate-fade-in-up h-full ${staggerClass}`}>
      <div
        className={`relative bg-surface-raised rounded-2xl p-5 transition-colors duration-150 h-full flex flex-col ${
          isRead ? 'border border-accent/20' : 'border border-border hover:border-border-bright'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2.5">
                <span className={`text-[10px] font-mono font-semibold tracking-wide uppercase ${sourceColor}`}>{article.source}</span>
                <span className="text-border-bright text-xs">·</span>
                <span className="text-[10px] text-muted/60 font-mono">{article.readTime}</span>
                {isRead && (
                  <span className="text-[9px] font-mono font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-md flex items-center gap-1">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Read
                  </span>
                )}
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-display font-semibold text-heading leading-snug hover:text-accent transition-colors block"
              >
                {article.title}
              </a>
            </div>
            <button
              onClick={onToggleRead}
              title={isRead ? 'Mark as unread' : 'Mark as read'}
              className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                isRead
                  ? 'bg-accent/12 text-accent hover:bg-accent/20'
                  : 'bg-surface-hover text-muted hover:text-text'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {isRead ? (
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                )}
              </svg>
            </button>
          </div>

          <p className="text-[12px] text-muted leading-relaxed mb-4">{article.description}</p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-1.5 flex-wrap">
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] font-mono text-muted/60 bg-surface-hover px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <DifficultyBadge difficulty={article.difficulty} />
          </div>
        </div>
      </div>
    </div>
  )
}
