'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: 'heart' | 'star' | 'circle'
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 初始化粒子
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff91a4'][Math.floor(Math.random() * 5)],
          type: ['heart', 'star', 'circle'][Math.floor(Math.random() * 3)] as 'heart' | 'star' | 'circle'
        })
      }
    }

    initParticles()

    // 绘制心形
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      const topCurveHeight = size * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      // 左侧曲线
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x - size / 2, y + (topCurveHeight + size) / 2, x, y + (topCurveHeight + size) / 2, x, y + size)
      // 右侧曲线
      ctx.bezierCurveTo(x, y + (topCurveHeight + size) / 2, x + size / 2, y + (topCurveHeight + size) / 2, x + size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight)
      ctx.fill()
    }

    // 绘制星形
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const spikes = 5
      const outerRadius = size
      const innerRadius = size * 0.4
      
      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / spikes
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fill()
    }

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 保持在画布内
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // 设置样式
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity

        // 绘制粒子
        switch (particle.type) {
          case 'heart':
            drawHeart(ctx, particle.x, particle.y, particle.size * 3)
            break
          case 'star':
            drawStar(ctx, particle.x, particle.y, particle.size * 2)
            break
          case 'circle':
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
            break
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20"
      style={{ background: 'transparent' }}
    />
  )
}
