import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { cookies, headers } from 'next/headers'
import clsx from 'clsx'
import { AntdRegistry } from '@ant-design/nextjs-registry'

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

  return (
    <html lang='en'>
      <head></head>
      <body className={clsx(inter.className, c?.value || 'light')}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
