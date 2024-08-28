import { cookies, headers } from 'next/headers'
import Client from './components/Client'

const Index = () => {
  const c = cookies().get('theme')
  console.log(c, '=-')

  return <Client dark={c?.value} />
}

export default Index
