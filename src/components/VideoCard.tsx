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
        className={`bg-surface-raised rounded-2xl overflow-hidden transition-colors duration-150 ${
          isWatched ? 'border border-accent/20' : 'border border-border hover:border-border-bright'
        }`}
      >
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block relative">
          <div className="aspect-video bg-void relative overflow-hidden">
            {!imgLoaded && <div className="absolute inset-0 thumbnail-shimmer" />}
            <img
              src={thumbnail}
              alt={video.title}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M6 4L14 9L6 14V4Z" fill="#0D0F11" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 bg-black/70 text-white/80 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md">
              {video.duration}
            </div>
            {isWatched && (
              <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              className="text-[13px] font-display font-semibold text-heading leading-snug hover:text-accent transition-colors line-clamp-2 flex-1"
            >
              {video.title}
            </a>
            <button
              onClick={onToggleWatched}
              title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
              className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                isWatched
                  ? 'bg-accent/12 text-accent hover:bg-accent/20'
                  : 'bg-surface-hover text-muted hover:text-text'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {isWatched ? (
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
                )}
              </svg>
            </button>
          </div>

          <p className="text-[11px] text-muted leading-relaxed mb-3 line-clamp-2">{video.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted/70 font-medium truncate mr-2">{video.channel}</span>
            <DifficultyBadge difficulty={video.difficulty} />
          </div>
        </div>
      </div>
    </div>
  )
}
