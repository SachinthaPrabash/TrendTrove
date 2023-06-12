'use-client'
import { useSession } from "next-auth/react"
import Layout from '@/components/Layout'


export default function Home() {

  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-600 flex justify-between">
        <h2>
          Hello, {session?.user?.name[0].toUpperCase() + session?.user?.name.slice(1)}
        </h2>
        <div className="flex bg-gray-200 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="" className='w-10 h-10' />
          <span className="px-2">{session?.user?.name[0].toUpperCase() + session?.user?.name.slice(1)}
          </span>
        </div>
      </div>
    </Layout>
  )
}
