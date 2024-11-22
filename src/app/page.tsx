import { sql } from '@vercel/postgres'
import Image from 'next/image'
import Header from './components/Layout/Header'

export default async function Home() {
  // const { rows } = await sql `SELECT * from CARTS where user_id=111`;
  // console.log(rows,'=============');

  return (
    <div className='flex min-h-screen flex-col items-center justify-between  bg-base text-diy-base'>
      <Header />
      <div className='flex-1 pt-16'>home</div>
    </div>
  )
}
