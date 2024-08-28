'use client'

import { setCookie } from '@/utils/tool'
import { useEffect, useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'
//
const Index = ({ dark }: { dark?: string }) => {
  const setThem = (mode: string) => {
    setCookie('theme', mode)
    dispose(mode)
  }

  useLayoutEffect(() => {
    setThem(dark || 'light')
  }, [])

  const dispose = (res: any) => {
    if (res === 'dark' || !window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  const cx = twMerge('text-green-500 text-red-400')

  return (
    <div className='flex  w-screen '>
      <div>left</div>
      <div className='flex-1'>center</div>
      <div>
        <div __cursorPointer className='font-semibold text-3xl' onClick={() => setThem('dark')}>
          dark
        </div>
        <div __cursorPointer className='font-semibold text-3xl' onClick={() => setThem('light')}>
          light
        </div>
      </div>
    </div>
  )
}

export default Index
