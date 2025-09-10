'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react'

interface Song {
  id: number
  title: string
  artist: string
  src: string
  duration: number
}

// 示例音乐列表 - 你可以替换为真实的音乐文件
const playlist: Song[] = [
  {
    id: 1,
    title: "Love Story",
    artist: "Romantic Music",
    src: "/music/love-story.mp3", // 需要添加实际的音乐文件
    duration: 180
  },
  {
    id: 2,
    title: "Sweet Dreams",
    artist: "Ambient Love",
    src: "/music/sweet-dreams.mp3",
    duration: 200
  },
  {
    id: 3,
    title: "Together Forever",
    artist: "Love Songs",
    src: "/music/together-forever.mp3",
    duration: 165
  }
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = playlist[currentSongIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => nextSong()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
    setCurrentTime(0)
  }

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    setCurrentTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * currentSong.duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100
    setVolume(newVolume)
    setIsMuted(false)
  }

  return (
    <>
      {/* 音乐播放器切换按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <Volume2 className="group-hover:scale-110 transition-transform" size={24} />
      </button>

      {/* 音乐播放器面板 */}
      <div className={`fixed bottom-24 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        <div className="music-player-panel bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 min-w-[300px]">
          {/* 当前歌曲信息 */}
          <div className="text-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">
              {currentSong.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {currentSong.artist}
            </p>
          </div>

          {/* 进度条 */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / currentSong.duration) * 100 || 0}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={prevSong}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={nextSong}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
      />

      {/* 自定义滑块样式 */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #ef4444);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #ef4444);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  )
}
