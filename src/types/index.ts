export type ContentType = 'video' | 'article'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export interface Video {
  id: string
  title: string
  youtubeId: string
  channel: string
  duration: string
  categoryId: string
  difficulty: Difficulty
  tags: string[]
  description: string
}

export interface Article {
  id: string
  title: string
  url: string
  source: string
  readTime: string
  categoryId: string
  difficulty: Difficulty
  tags: string[]
  description: string
}

export type ActiveTab = 'videos' | 'articles' | 'watched'

export interface ProgressState {
  watchedVideos: Set<string>
  readArticles: Set<string>
}
