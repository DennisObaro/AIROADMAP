import type { ActiveTab } from '../types'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { xProfiles } from '../data/follows'
import { aiTools } from '../data/tools'

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
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="2.5" width="15" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.5 6.5V11.5L12 9L7.5 6.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'articles',
    label: 'Articles',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 2H13L15 4.5V16H4V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="6.5" y1="7.5" x2="12" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="6.5" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="6.5" y1="12.5" x2="10" y2="12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'watched',
    label: 'Completed',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function AvatarFallback({ name }: { name: string }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center shrink-0">
      <span className="text-[10px] font-mono font-bold text-muted">{initials}</span>
    </div>
  )
}

function ProfileAvatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <AvatarFallback name={name} />
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-8 h-8 rounded-full object-cover shrink-0 bg-surface-hover"
    />
  )
}

export function Sidebar({ activeTab, onTabChange, videosCount, articlesCount, watchedCount }: SidebarProps) {
  const [followOpen, setFollowOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  const counts: Record<ActiveTab, number> = {
    videos: videosCount,
    articles: articlesCount,
    watched: watchedCount,
  }

  const pct = Math.round((watchedCount / (videosCount + articlesCount)) * 100)

  return (
    <>
      <aside className="fixed left-0 top-0 bottom-0 w-[272px] bg-surface border-r border-border flex flex-col z-50">
        {/* Brand */}
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-surface-raised flex items-center justify-center border border-border">
              <span className="text-accent font-bold text-[13px] font-mono tracking-tight">AI</span>
            </div>
            <div>
              <h1 className="text-heading font-display font-bold text-[16px] tracking-tight leading-none">AI Roadmap</h1>
              <p className="text-muted text-[10px] font-mono tracking-[0.14em] uppercase mt-1">Learn · Build · Ship</p>
            </div>
          </div>
        </div>

        <div className="mx-5 h-px bg-border" />

        {/* Nav tabs */}
        <nav className="flex-1 px-4 pt-5 space-y-0.5">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-150 group cursor-pointer relative ${
                  isActive
                    ? 'bg-surface-raised text-heading'
                    : 'text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                <span className={`transition-colors ${isActive ? 'text-heading' : 'text-muted group-hover:text-text'}`}>
                  {tab.icon}
                </span>
                <span className="flex-1 text-left">{tab.label}</span>
                <span
                  className={`text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-surface-hover text-text' : 'text-muted/60'
                  }`}
                >
                  {counts[tab.id]}
                </span>
              </button>
            )
          })}

          {/* Follow on X trigger */}
          <button
            onClick={() => setFollowOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-muted hover:text-text hover:bg-surface-hover transition-colors duration-150 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-muted">
              <path d="M10.53 2H12.47L8.4 6.66L13.22 13H9.52L6.78 9.38L3.65 13H1.71L6.07 8L1.43 2H5.22L7.68 5.3L10.53 2ZM9.92 11.86H10.92L4.78 3.02H3.7L9.92 11.86Z" fill="currentColor" />
            </svg>
            <span className="flex-1 text-left">Follow on X</span>
            <span className="text-muted/40">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Tools trigger */}
          <button
            onClick={() => setToolsOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-muted hover:text-text hover:bg-surface-hover transition-colors duration-150 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-muted">
              <path d="M7.5 2.5H4A1.5 1.5 0 0 0 2.5 4v3.5a1.5 1.5 0 0 0 1.5 1.5h3.5a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 7.5 2.5Z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M14 2.5h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5a1.5 1.5 0 0 0 1.5 1.5H14a1.5 1.5 0 0 0 1.5-1.5V4A1.5 1.5 0 0 0 14 2.5Z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M7.5 10.5H4A1.5 1.5 0 0 0 2.5 12v3.5a1.5 1.5 0 0 0 1.5 1.5h3.5a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5Z" stroke="currentColor" strokeWidth="1.3" />
              <path d="M14 10.5h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5a1.5 1.5 0 0 0 1.5 1.5H14a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5Z" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span className="flex-1 text-left">Tools</span>
            <span className="text-muted/40">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </nav>

        {/* Progress card */}
        <div className="p-4">
          <div className="bg-surface-raised rounded-xl p-5 border border-border">
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.15em] mb-3">Your Progress</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-display font-bold text-heading tabular-nums">{watchedCount}</span>
              <span className="text-muted text-sm font-mono">/ {videosCount + articlesCount}</span>
            </div>
            <div className="mt-4 h-1.5 bg-void rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(pct, 2)}%` }}
              />
            </div>
            <p className="text-[11px] text-muted mt-2.5 font-mono">
              {pct}% complete
            </p>
          </div>
        </div>
      </aside>

      {/* Follow on X panel */}
      {followOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setFollowOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-[272px] top-0 bottom-0 w-[300px] bg-surface border-r border-border flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
              <h2 className="text-[15px] font-display font-bold text-heading">Follow on X</h2>
              <button
                onClick={() => setFollowOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-text hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="mx-5 h-px bg-border" />
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              {xProfiles.map(profile => (
                <a
                  key={profile.handle}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover transition-colors group"
                >
                  <ProfileAvatar src={profile.avatar} name={profile.name} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-heading group-hover:text-accent transition-colors block truncate">{profile.name}</span>
                    <p className="text-[10px] text-muted/50 font-mono">@{profile.handle}</p>
                    <p className="text-[11px] text-muted leading-snug mt-1.5">{profile.bio}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools panel */}
      {toolsOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setToolsOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute left-[272px] top-0 bottom-0 w-[300px] bg-surface border-r border-border flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-6 pb-4">
              <h2 className="text-[15px] font-display font-bold text-heading">AI Tools</h2>
              <button
                onClick={() => setToolsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-text hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="mx-5 h-px bg-border" />
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              {aiTools.map(tool => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 px-3 py-3 rounded-xl hover:bg-surface-hover transition-colors group"
                >
                  <span className="text-[13px] font-semibold text-heading group-hover:text-accent transition-colors">{tool.name}</span>
                  <p className="text-[11px] text-muted leading-snug">{tool.description}</p>
                  {tool.platform && (
                    <p className="text-[10px] text-muted/50 font-mono">{tool.platform}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
