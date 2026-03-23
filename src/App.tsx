import { useState, useMemo } from 'react'
import { useNarrowViewport } from './hooks/useNarrowViewport'
import type { ActiveTab, Difficulty } from './types'
import { categories } from './data/categories'
import { videos } from './data/videos'
import { articles } from './data/articles'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { SearchBar } from './components/SearchBar'
import { FilterDropdown } from './components/FilterDropdown'
import { VideoCard } from './components/VideoCard'
import { ArticleCard } from './components/ArticleCard'
import { EmptyState } from './components/EmptyState'
import { MobileBlockScreen } from './components/MobileBlockScreen'

const BEGINNER_CLAUDE_VIDEO_IDS = [
  'v-19',
  'v-6',
  'v-10',
  'v-32',
  'v-36',
  'v-20',
  'v-21',
  'v-22',
  'v-23',
  'v-34',
]

export default function App() {
  const narrowViewport = useNarrowViewport()
  const [activeTab, setActiveTab] = useState<ActiveTab>('videos')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(null)
  const { watchedVideos, readArticles, toggleVideoWatched, toggleArticleRead } = useProgress()

  const filteredVideos = useMemo(() => {
    let result = videos
    if (activeDifficulty === 'beginner') {
      const orderMap = new Map(BEGINNER_CLAUDE_VIDEO_IDS.map((id, index) => [id, index]))
      result = videos
        .filter(video => orderMap.has(video.id))
        .sort((a, b) => (orderMap.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (orderMap.get(b.id) ?? Number.MAX_SAFE_INTEGER))
    } else if (activeDifficulty) {
      result = result.filter(v => v.difficulty === activeDifficulty)
    }

    if (activeCategory) result = result.filter(v => v.categoryId === activeCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          v.tags.some(t => t.includes(q)) ||
          v.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, activeDifficulty, searchQuery])

  const filteredArticles = useMemo(() => {
    let result = articles
    if (activeCategory) result = result.filter(a => a.categoryId === activeCategory)
    if (activeDifficulty) result = result.filter(a => a.difficulty === activeDifficulty)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q) ||
          a.tags.some(t => t.includes(q)) ||
          a.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, activeDifficulty, searchQuery])

  const watchedCount = useMemo(
    () => filteredVideos.filter(video => watchedVideos.has(video.id)).length + filteredArticles.filter(article => readArticles.has(article.id)).length,
    [filteredVideos, filteredArticles, watchedVideos, readArticles]
  )

  const completedVideos = useMemo(() => videos.filter(v => watchedVideos.has(v.id)), [watchedVideos])
  const completedArticles = useMemo(() => articles.filter(a => readArticles.has(a.id)), [readArticles])

  const groupedVideos = useMemo(() => {
    const groups: Record<string, typeof filteredVideos> = {}
    for (const cat of categories) {
      const catVideos = filteredVideos.filter(v => v.categoryId === cat.id)
      if (catVideos.length > 0) groups[cat.id] = catVideos
    }
    return groups
  }, [filteredVideos])

  const groupedArticles = useMemo(() => {
    const groups: Record<string, typeof filteredArticles> = {}
    for (const cat of categories) {
      const catArticles = filteredArticles.filter(a => a.categoryId === cat.id)
      if (catArticles.length > 0) groups[cat.id] = catArticles
    }
    return groups
  }, [filteredArticles])

  const tabTitles: Record<ActiveTab, string> = {
    videos: 'YouTube Videos',
    articles: 'Articles & Docs',
    watched: 'Completed',
  }

  const tabDescriptions: Record<ActiveTab, string> = {
    videos: 'Curated video tutorials to guide your AI development journey',
    articles: 'In-depth articles, documentation, and guides from top sources',
    watched: 'Videos you\'ve watched and articles you\'ve read',
  }

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab)
    setSearchQuery('')
    setActiveCategory(null)
    setActiveDifficulty(null)
  }

  function renderCategoryHeader(cat: typeof categories[number], index: number) {
    const step = String(index + 1).padStart(2, '0')
    return (
      <div className="flex items-center gap-4 mb-5">
        <span className="step-number">{step}</span>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2.5">
          <span className="text-muted text-sm">{cat.icon}</span>
          <h3 className="text-[15px] font-display font-bold text-heading tracking-tight">{cat.title}</h3>
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>
    )
  }

  if (narrowViewport) {
    return <MobileBlockScreen />
  }

  return (
    <div className="ai-desktop-shell min-h-screen bg-void relative z-10">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        videosCount={filteredVideos.length}
        articlesCount={filteredArticles.length}
        watchedCount={watchedCount}
      />

      <main className="ml-[272px] min-h-screen">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-void/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-[1200px] mx-auto px-8 pt-7 pb-5">
            <div className="mb-5">
              <h2 className="text-[26px] font-display font-bold text-heading tracking-tight leading-none">
                {tabTitles[activeTab]}
              </h2>
              <p className="text-[13px] text-muted mt-2">{tabDescriptions[activeTab]}</p>
            </div>
            {activeTab !== 'watched' && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                <FilterDropdown
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  activeDifficulty={activeDifficulty}
                  onDifficultyChange={setActiveDifficulty}
                />
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {activeTab === 'videos' && (
            <>
              {Object.keys(groupedVideos).length === 0 ? (
                <EmptyState icon="◇" title="No videos found" description="Try adjusting your search or filters to find what you're looking for." />
              ) : (
                <div className="space-y-12">
                  {categories
                    .filter(cat => groupedVideos[cat.id])
                    .map((cat, catIndex) => (
                      <section key={cat.id}>
                        {renderCategoryHeader(cat, catIndex)}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                          {groupedVideos[cat.id].map((video, i) => (
                            <VideoCard
                              key={video.id}
                              video={video}
                              isWatched={watchedVideos.has(video.id)}
                              onToggleWatched={() => toggleVideoWatched(video.id)}
                              index={i}
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'articles' && (
            <>
              {Object.keys(groupedArticles).length === 0 ? (
                <EmptyState icon="◇" title="No articles found" description="Try adjusting your search or filters to find what you're looking for." />
              ) : (
                <div className="space-y-12">
                  {categories
                    .filter(cat => groupedArticles[cat.id])
                    .map((cat, catIndex) => (
                      <section key={cat.id}>
                        {renderCategoryHeader(cat, catIndex)}
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                          {groupedArticles[cat.id].map((article, i) => (
                            <ArticleCard
                              key={article.id}
                              article={article}
                              isRead={readArticles.has(article.id)}
                              onToggleRead={() => toggleArticleRead(article.id)}
                              index={i}
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'watched' && (
            <>
              {completedVideos.length === 0 && completedArticles.length === 0 ? (
                <EmptyState
                  icon="◎"
                  title="Nothing completed yet"
                  description="Start watching videos or reading articles and they'll show up here as you complete them."
                />
              ) : (
                <div className="space-y-12">
                  {completedVideos.length > 0 && (
                    <section>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-6 h-6 rounded-lg bg-surface-raised flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text">
                            <rect x="1" y="2" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M5.5 5V9L9.5 7L5.5 5Z" fill="currentColor" />
                          </svg>
                        </div>
                        <h3 className="text-[15px] font-display font-bold text-heading">
                          Watched Videos
                        </h3>
                        <span className="text-[11px] font-mono text-muted">{completedVideos.length}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {completedVideos.map((video, i) => (
                          <VideoCard
                            key={video.id}
                            video={video}
                            isWatched={true}
                            onToggleWatched={() => toggleVideoWatched(video.id)}
                            index={i}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {completedArticles.length > 0 && (
                    <section>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-6 h-6 rounded-lg bg-surface-raised flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text">
                            <path d="M3 1.5H10L12 3.5V12.5H3V1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                            <line x1="5" y1="6" x2="9.5" y2="6" stroke="currentColor" strokeWidth="1" />
                            <line x1="5" y1="8" x2="9.5" y2="8" stroke="currentColor" strokeWidth="1" />
                          </svg>
                        </div>
                        <h3 className="text-[15px] font-display font-bold text-heading">
                          Read Articles
                        </h3>
                        <span className="text-[11px] font-mono text-muted">{completedArticles.length}</span>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                        {completedArticles.map((article, i) => (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            isRead={true}
                            onToggleRead={() => toggleArticleRead(article.id)}
                            index={i}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
