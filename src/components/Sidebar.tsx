import type { ActiveTab } from '../types'
import type { ReactNode } from 'react'

interface SidebarProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
  videosCount: number
  articlesCount: number
  watchedCount: number
}

const tabs: { id: ActiveTab; label: string; icon: ReactNode }[] = [
  {
    id: 'videos',
    label: 'Videos',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7.5V12.5L13 10L8 7.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'articles',
    label: 'Articles',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 3H14L16 5V17H4V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="7" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" />
        <line x1="7" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'watched',
    label: 'Completed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function Sidebar({ activeTab, onTabChange, videosCount, articlesCount, watchedCount }: SidebarProps) {
  const counts: Record<ActiveTab, number> = {
    videos: videosCount,
    articles: articlesCount,
    watched: watchedCount,
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-border flex flex-col z-50">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center glow-ring">
            <span className="text-white font-bold text-sm font-mono">AI</span>
          </div>
          <div>
            <h1 className="text-heading font-bold text-[15px] tracking-tight leading-tight">AI Roadmap</h1>
            <p className="text-muted text-[11px] font-mono tracking-wide uppercase">Learn · Build · Ship</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-accent/12 text-accent-glow border border-accent/20'
                  : 'text-muted hover:text-text hover:bg-surface-hover border border-transparent'
              }`}
            >
              <span className={`transition-colors ${isActive ? 'text-accent' : 'text-muted group-hover:text-text'}`}>
                {tab.icon}
              </span>
              <span className="flex-1 text-left">{tab.label}</span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-accent/20 text-accent-glow' : 'bg-surface-raised text-muted'
                }`}
              >
                {counts[tab.id]}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-surface-raised rounded-xl p-4 border border-border">
          <p className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">Progress</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-heading">{watchedCount}</span>
            <span className="text-muted text-sm">/ {videosCount + articlesCount}</span>
          </div>
          <div className="mt-3 h-1.5 bg-void rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-glow rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.round((watchedCount / (videosCount + articlesCount)) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-muted mt-2">
            {Math.round((watchedCount / (videosCount + articlesCount)) * 100)}% complete
          </p>
        </div>
      </div>
    </aside>
  )
}
