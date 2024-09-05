'use client'

import { setCookie } from '@/utils/tool'
import { twMerge } from 'tailwind-merge'
//
const Index = () => {
  const setThem = (mode: string) => {
    setCookie('theme', mode)
    dispose(mode)
  }

  const dispose = (res: any) => {
    if (res === 'dark' || !window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
  const cx = twMerge('text-green-500 text-red-400')

  return (
    <div className='flex  w-screen px-10 py-3'>
      <div>left</div>
      <div className='flex-1'>center</div>
      <div className='flex'>
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