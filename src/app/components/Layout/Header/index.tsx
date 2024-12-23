import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import Client from './components/Client'

const Index = async () => {
  const c = (await cookies()).get('theme')

  return <Client dark={c?.value == 'dark'} />
}

export default Index
