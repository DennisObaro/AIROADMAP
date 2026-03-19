import { useState, useMemo } from 'react'
import type { ActiveTab, Difficulty } from './types'
import { categories } from './data/categories'
import { videos } from './data/videos'
import { articles } from './data/articles'
import { useProgress } from './hooks/useProgress'
import { Sidebar } from './components/Sidebar'
import { SearchBar } from './components/SearchBar'
import { CategoryFilter } from './components/CategoryFilter'
import { VideoCard } from './components/VideoCard'
import { ArticleCard } from './components/ArticleCard'
import { EmptyState } from './components/EmptyState'

const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('videos')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(null)
  const { watchedVideos, readArticles, toggleVideoWatched, toggleArticleRead } = useProgress()

  const watchedCount = watchedVideos.size + readArticles.size

  const filteredVideos = useMemo(() => {
    let result = videos
    if (activeCategory) result = result.filter(v => v.categoryId === activeCategory)
    if (activeDifficulty) result = result.filter(v => v.difficulty === activeDifficulty)
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
    articles: 'In-depth articles, documentation, and guides',
    watched: 'Videos you\'ve watched and articles you\'ve read',
  }

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab)
    setSearchQuery('')
    setActiveCategory(null)
    setActiveDifficulty(null)
  }

  return (
    <div className="min-h-screen bg-void">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        videosCount={videos.length}
        articlesCount={articles.length}
        watchedCount={watchedCount}
      />

      <main className="ml-[260px] min-h-screen">
        <header className="sticky top-0 z-40 bg-void/80 backdrop-blur-xl border-b border-border">
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-heading tracking-tight">{tabTitles[activeTab]}</h2>
                <p className="text-sm text-muted mt-1">{tabDescriptions[activeTab]}</p>
              </div>
              {activeTab !== 'watched' && (
                <div className="flex items-center gap-2">
                  {difficulties.map(d => (
                    <button
                      key={d}
                      onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                        activeDifficulty === d
                          ? d === 'beginner'
                            ? 'bg-emerald/10 text-emerald border-emerald/25'
                            : d === 'intermediate'
                              ? 'bg-amber/10 text-amber border-amber/25'
                              : 'bg-rose/10 text-rose border-rose/25'
                          : 'text-muted border-border hover:border-border-bright hover:text-text'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {activeTab !== 'watched' && (
              <div className="flex items-center gap-4">
                <div className="w-80">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                <div className="flex-1 overflow-x-auto">
                  <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="px-8 py-6">
          {activeTab === 'videos' && (
            <>
              {Object.keys(groupedVideos).length === 0 ? (
                <EmptyState
                  icon="🔍"
                  title="No videos found"
                  description="Try adjusting your search or filters to find what you're looking for."
                />
              ) : (
                <div className="space-y-10">
                  {categories
                    .filter(cat => groupedVideos[cat.id])
                    .map(cat => (
                      <section key={cat.id}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-accent text-lg">{cat.icon}</span>
                          <div>
                            <h3 className="text-lg font-bold text-heading">{cat.title}</h3>
                            <p className="text-xs text-muted">{cat.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                <EmptyState
                  icon="🔍"
                  title="No articles found"
                  description="Try adjusting your search or filters to find what you're looking for."
                />
              ) : (
                <div className="space-y-10">
                  {categories
                    .filter(cat => groupedArticles[cat.id])
                    .map(cat => (
                      <section key={cat.id}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-accent text-lg">{cat.icon}</span>
                          <div>
                            <h3 className="text-lg font-bold text-heading">{cat.title}</h3>
                            <p className="text-xs text-muted">{cat.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
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
                  icon="✦"
                  title="Nothing completed yet"
                  description="Start watching videos or reading articles and they'll show up here as you complete them."
                />
              ) : (
                <div className="space-y-10">
                  {completedVideos.length > 0 && (
                    <section>
                      <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald">
                          <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M8 7.5V12.5L13 10L8 7.5Z" fill="currentColor" />
                        </svg>
                        <h3 className="text-lg font-bold text-heading">
                          Watched Videos
                          <span className="text-sm font-normal text-muted ml-2">({completedVideos.length})</span>
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                      <div className="flex items-center gap-2 mb-4">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald">
                          <path d="M4 3H14L16 5V17H4V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                          <line x1="7" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="7" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <h3 className="text-lg font-bold text-heading">
                          Read Articles
                          <span className="text-sm font-normal text-muted ml-2">({completedArticles.length})</span>
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
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
