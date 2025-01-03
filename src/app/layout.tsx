import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我们',
  description: '记录我们的时间',
}

export default async function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode
  }>
) {
  const c = (await cookies()).get('theme')

  return (
    <html lang='en'>
      <head></head>
      <body className={clsx(inter.className, c?.value || 'light')}>{children}</body>
    </html>
  )
}
