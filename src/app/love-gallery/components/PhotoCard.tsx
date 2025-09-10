'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Calendar, MapPin } from 'lucide-react'

interface Photo {
  id: number
  src: string
  alt: string
  title: string
  description: string
  date: string
  location?: string
}

interface PhotoCardProps {
  photo: Photo
  index: number
  onClick: () => void
  variant?: 'default' | 'hover-zoom' | 'hover-rotate' | 'hover-flip' | 'hover-slide'
}

export default function PhotoCard({ 
  photo, 
  index, 
  onClick, 
  variant = 'default' 
}: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getCardClasses = () => {
    const baseClasses = "photo-card group cursor-pointer relative"
    
    switch (variant) {
      case 'hover-zoom':
        return `${baseClasses} hover-zoom-card`
      case 'hover-rotate':
        return `${baseClasses} hover-rotate-card`
      case 'hover-flip':
        return `${baseClasses} hover-flip-card`
      case 'hover-slide':
        return `${baseClasses} hover-slide-card`
      default:
        return baseClasses
    }
  }

  return (
    <div
      className={getCardClasses()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        
        {/* 照片容器 */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className={`object-cover transition-all duration-700 ${
              variant === 'hover-zoom' ? 'group-hover:scale-110' :
              variant === 'hover-rotate' ? 'group-hover:scale-110 group-hover:rotate-3' :
              variant === 'hover-flip' ? 'group-hover:scale-105' :
              variant === 'hover-slide' ? 'group-hover:scale-105' :
              'group-hover:scale-110'
            }`}
            onLoad={() => setIsLoaded(true)}
            data-loaded={isLoaded}
          />
          
          {/* 渐变遮罩 */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            variant === 'hover-slide' 
              ? 'bg-gradient-to-r from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100'
              : 'bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100'
          }`} />
          
          {/* 特殊效果层 */}
          {variant === 'hover-flip' && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          
          {/* 悬停内容 */}
          <div className={`absolute text-white transition-all duration-500 ${
            variant === 'hover-slide' 
              ? 'left-0 top-1/2 -translate-y-1/2 p-6 transform -translate-x-full group-hover:translate-x-0'
              : 'bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-red-400 fill-current animate-pulse" size={16} />
              <h3 className="text-xl font-bold">{photo.title}</h3>
            </div>
            <p className="text-sm opacity-90 mb-2">{photo.description}</p>
            <div className="flex items-center gap-4 text-xs opacity-75">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{photo.date}</span>
              </div>
              {photo.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{photo.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* 爱心图标 */}
          <div className={`absolute transition-all duration-500 ${
            variant === 'hover-slide' 
              ? 'top-4 left-4 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0'
              : 'top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0'
          }`}>
            <Heart 
              className={`text-red-500 fill-current ${isHovered ? 'animate-bounce' : ''}`} 
              size={24} 
            />
          </div>
          
          {/* 装饰性元素 */}
          {variant === 'hover-flip' && (
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 卡片底部信息（仅在某些变体中显示） */}
        {variant === 'default' && (
          <div className="p-4 bg-white dark:bg-gray-800">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
              {photo.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {photo.date}
            </p>
          </div>
        )}
      </div>
      
      {/* 外部光晕效果 */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-red-400/20 blur-xl transform scale-110" />
      </div>
    </div>
  )
}
