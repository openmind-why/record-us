import { cookies } from 'next/headers'
import Client from './components/Client'

const Index = () => {
  const c = cookies().get('theme')

  return <Client dark={c?.value == 'dark'} />
}

export default Index
