'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ArrowLeft, Star, Sparkles, X, Sun, Moon } from 'lucide-react'
import PhotoCard from './components/PhotoCard'
import ParticleBackground from './components/ParticleBackground'
import MusicPlayer from './components/MusicPlayer'
import './styles.css'

// 示例照片数据 - 你可以替换为真实的照片
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop&crop=faces',
    alt: '我们的第一次约会',
    title: '初遇',
    description: '那个美好的下午，我们第一次相遇',
    date: '2023.03.14',
    location: '咖啡厅'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop&crop=faces',
    alt: '一起看日落',
    title: '日落时分',
    description: '和你一起看过最美的夕阳',
    date: '2023.05.20',
    location: '海边'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=400&fit=crop&crop=faces',
    alt: '生日惊喜',
    title: '生日快乐',
    description: '为你准备的小惊喜',
    date: '2023.07.08',
    location: '家里'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=faces',
    alt: '旅行回忆',
    title: '旅行时光',
    description: '我们一起走过的地方',
    date: '2023.09.15',
    location: '巴黎'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop&crop=faces',
    alt: '日常生活',
    title: '平凡日常',
    description: '最珍贵的是和你在一起的每一天',
    date: '2023.11.22',
    location: '公园'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop&crop=center',
    alt: '节日庆祝',
    title: '节日快乐',
    description: '每个节日都因为有你而特别',
    date: '2023.12.25',
    location: '家里'
  }
]

// 不同的悬停效果变体
const hoverVariants = ['default', 'hover-zoom', 'hover-rotate', 'hover-flip', 'hover-slide'] as const

export default function LoveGallery() {
  const [mounted, setMounted] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 检查当前主题
    setIsDark(document.body.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.body.classList.add('dark')
      document.cookie = 'theme=dark; path=/'
    } else {
      document.body.classList.remove('dark')
      document.cookie = 'theme=light; path=/'
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 relative overflow-hidden">
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 浮动的爱心 */}
        <div className="floating-hearts">
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-300/30 dark:text-pink-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`
              }}
            />
          ))}
        </div>

        {/* 闪烁的星星 */}
        <div className="twinkling-stars">
          {[...Array(12)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-300/40 dark:text-yellow-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 15 + 8}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>返回首页</span>
          </Link>

          <div className="flex items-center gap-2">
            <Sparkles className="text-pink-500" size={24} />
            <h1 className="nav-title text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              我们的回忆
            </h1>
            <Sparkles className="text-pink-500" size={24} />
          </div>

          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
          >
            {isDark ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-gray-600" size={20} />
            )}
          </button>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="relative z-10 px-6 pb-12">
        <div className="container-max max-w-7xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h2 className="page-title text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Love Gallery
            </h2>
            <p className="page-description text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              记录我们在一起的美好时光，每一张照片都是我们爱情故事的珍贵片段
            </p>
          </div>

          {/* 照片网格 */}
          <div className="photo-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => setSelectedPhoto(photo.id)}
                variant={hoverVariants[index % hoverVariants.length]}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 照片模态框 */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="modal-content relative max-w-4xl max-h-[90vh] w-full">
            {/* 关闭按钮 */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* 照片详情 */}
            {(() => {
              const photo = photos.find(p => p.id === selectedPhoto)
              if (!photo) return null

              return (
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-video md:aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="text-red-500 fill-current" size={20} />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {photo.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {photo.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {photo.date}
                    </p>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* 音乐播放器 */}
      <MusicPlayer />
    </div>
  )
}
