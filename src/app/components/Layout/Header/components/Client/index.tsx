'use client'

import ThemeSwitch from '@/app/components/Part/ThemeSwitch'
import { setCookie } from '@/utils/tool'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
//
const Index = ({ dark }: { dark?: boolean }) => {
  const [isDark, setIsDark] = useState<boolean>(!!dark)
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
    setIsDark(v)
    setThem(v ? 'dark' : 'light')
  }
  return (
    <div className='px-10 py-3 headerCard'>
      <div className='flex-1'>center</div>
      <div className='flex'>
        {/* <Segmented
          options={[
            { value: true, label: '暗黑' },
            { value: false, label: '明亮' },
          ]}
          value={isDark}
          onChange={onChange}
        /> */}
        <ThemeSwitch />
        <div __cursorPointer className='font-semibold text-3xl mr-2' onClick={() => setThem('dark')}>
          暗黑
        </div>
        <div __cursorPointer className='font-semibold text-3xl' onClick={() => setThem('light')}>
          明亮
        </div>
      </div>
    </div>
  )
}

export default Index
