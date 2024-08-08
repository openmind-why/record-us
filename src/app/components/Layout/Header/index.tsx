'use client'

import { useEffect } from 'react'

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
    <div>
      header
      <div onClick={() => setThem('dark')}>dark</div>
      <div onClick={() => setThem('light')}>light</div>
    </div>
  )
}

export default Index
