import { sql } from '@vercel/postgres'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Layout/Header'
import { Heart, Camera } from 'lucide-react'

export default async function Home() {
  // const { rows } = await sql `SELECT * from CARTS where user_id=111`;
  // console.log(rows,'=============');

  return (
    <div className='flex min-h-screen flex-col items-center justify-between  bg-base text-diy-base'>
      <Header />
      <div className='flex-1 pt-16 flex items-center justify-center'>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl font-bold mb-8'>欢迎来到我们的世界</h1>

          {/* 情侣相册入口 */}
          <Link
            href="/love-gallery"
            className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            <Heart className="fill-current" size={24} />
            <span className='text-lg font-semibold'>进入我们的回忆相册</span>
            <Camera size={24} />
          </Link>

          <p className='text-gray-600 dark:text-gray-300 max-w-md mx-auto'>
            记录我们在一起的美好时光，每一张照片都是我们爱情故事的珍贵片段
          </p>
        </div>
      </div>
    </div>
  )
}
