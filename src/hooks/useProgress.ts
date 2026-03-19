import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'ai-roadmap-progress'

interface StoredProgress {
  watchedVideos: string[]
  readArticles: string[]
}

function loadProgress(): { watchedVideos: Set<string>; readArticles: Set<string> } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: StoredProgress = JSON.parse(raw)
      return {
        watchedVideos: new Set(parsed.watchedVideos),
        readArticles: new Set(parsed.readArticles),
      }
    }
  } catch {}
  return { watchedVideos: new Set(), readArticles: new Set() }
}

function saveProgress(watchedVideos: Set<string>, readArticles: Set<string>) {
  const data: StoredProgress = {
    watchedVideos: Array.from(watchedVideos),
    readArticles: Array.from(readArticles),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(() => loadProgress().watchedVideos)
  const [readArticles, setReadArticles] = useState<Set<string>>(() => loadProgress().readArticles)

  useEffect(() => {
    saveProgress(watchedVideos, readArticles)
  }, [watchedVideos, readArticles])

  const toggleVideoWatched = useCallback((videoId: string) => {
    setWatchedVideos(prev => {
      const next = new Set(prev)
      if (next.has(videoId)) next.delete(videoId)
      else next.add(videoId)
      return next
    })
  }, [])

  const toggleArticleRead = useCallback((articleId: string) => {
    setReadArticles(prev => {
      const next = new Set(prev)
      if (next.has(articleId)) next.delete(articleId)
      else next.add(articleId)
      return next
    })
  }, [])

  return {
    watchedVideos,
    readArticles,
    toggleVideoWatched,
    toggleArticleRead,
  }
}
