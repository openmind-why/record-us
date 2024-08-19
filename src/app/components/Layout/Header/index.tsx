'use client'

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
//
const Index = () => {
  const setThem = (mode: string) => {
    window.localStorage.setItem('theme', mode)
    dispose(mode)
  }

  const dispose = (res: any) => {
    if (res === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className='flex  w-screen '>
      <div className={twMerge('text-green-500 text-red-400')}>left</div>
      <div>center</div>
      <div>
        <div __cursorPointer onClick={() => setThem('dark')}>
          dark
        </div>
        <div __cursorPointer onClick={() => setThem('light')}>
          light
        </div>
      </div>
    </div>
  )
}

export default Index
