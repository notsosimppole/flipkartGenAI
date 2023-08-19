import Sidebar from '@/components/sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/sessionProvider'
import { getServerSession } from "next-auth";
import { handler } from './api/auth/[...nextauth]/route';
import Login from '@/components/login';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flipkart Generative AI Thing',
  description: 'I have no idea what I am doing',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session : any = await getServerSession(handler);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session? (
            <div className='h-screen bg-black'>
              <Login />
            </div>
          ):(
            <div className='flex'>
              {/*side bar */}
              <div className='bg-[#202123]  max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
                <Sidebar />
              </div>
              {
                /*Client Provider - Notifs */
              }
              <div className='bg-[#343541] h-full flex-1'>
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
