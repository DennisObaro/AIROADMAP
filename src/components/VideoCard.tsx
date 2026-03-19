import type { Video } from '../types'
import { DifficultyBadge } from './DifficultyBadge'
import { useState } from 'react'

interface VideoCardProps {
  video: Video
  isWatched: boolean
  onToggleWatched: () => void
  index: number
}

export function VideoCard({ video, isWatched, onToggleWatched, index }: VideoCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
  const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`

  const staggerClass = index <= 8 ? `stagger-${Math.min(index + 1, 8)}` : ''

  return (
    <div className={`group animate-fade-in-up ${staggerClass}`}>
      <div
        className={`bg-surface-raised rounded-2xl border overflow-hidden transition-all duration-300 hover:border-border-bright hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(139,92,246,0.12)] ${
          isWatched ? 'border-emerald/30' : 'border-border'
        }`}
      >
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block relative">
          <div className="aspect-video bg-surface relative overflow-hidden">
            {!imgLoaded && <div className="absolute inset-0 thumbnail-shimmer" />}
            <img
              src={thumbnail}
              alt={video.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
              {video.duration}
            </div>
            {isWatched && (
              <div className="absolute top-2 left-2 bg-emerald/90 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded-md flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Watched
              </div>
            )}
          </div>
        </a>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-heading leading-snug hover:text-accent-glow transition-colors line-clamp-2 flex-1"
            >
              {video.title}
            </a>
            <button
              onClick={onToggleWatched}
              title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
              className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isWatched
                  ? 'bg-emerald/15 text-emerald hover:bg-emerald/25'
                  : 'bg-surface-hover text-muted hover:text-accent hover:bg-accent/10'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {isWatched ? (
                  <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                )}
              </svg>
            </button>
          </div>

          <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{video.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted font-medium">{video.channel}</span>
            <DifficultyBadge difficulty={video.difficulty} />
          </div>
        </div>
      </div>
    </div>
  )
}
