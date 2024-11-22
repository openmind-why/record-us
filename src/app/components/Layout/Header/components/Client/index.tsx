'use client'

import ThemeSwitch from '@/app/components/Part/ThemeSwitch'
import { setCookie } from '@/utils/tool'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
//
const Index = ({ dark }: { dark?: boolean }) => {
  const switchRef = useRef<any>(null)
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

  const onChange = (v: boolean) => {
    setThem(v ? 'dark' : 'light')
  }

  useEffect(() => {
    switchRef.current?.ipt.current?.addEventListener('change', function (event: any) {
      onChange(event.target.checked)
    })
  }, [])
  return (
    <div className='px-10 py-3 headerCard'>
      <div className='flex-1'>center</div>
      <div className='flex'>
        <ThemeSwitch ref={switchRef} />
      </div>
    </div>
  )
}

export default Index
