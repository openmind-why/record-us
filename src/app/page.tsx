import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Home() {
  // const { rows } = await sql `SELECT * from CARTS where user_id=111`;
  // console.log(rows,'=============');
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
     home
    </div>
  );
}
