import ChatPage from '@/components/chatPage'
import { BeakerIcon, BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className='mx-2'>
      {/* <h1 className='text-5xl font-bold mb-8'>
        Chataroni 3000 - Now with 1000% more sass
      </h1> */}
      <ChatPage />
    </div>
  ) 
}
