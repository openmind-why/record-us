import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { cookies, headers } from 'next/headers'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我们',
  description: '记录我们的时间',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const c = cookies().get('theme')
  console.log(c, '====layoutcc----')

  return (
    <html lang='en'>
      <head>
        <Script>
          {/* {`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}`} */}
        </Script>
      </head>
      <body className={clsx(inter.className, c?.value || 'light')}>{children}</body>
    </html>
  )
}
