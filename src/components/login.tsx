'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <Image src='/images/logo.png' className="" width={200} height={200} alt = "" />
        <button className="px-12 py-4 my-8 bg-[#bfef16] text-black rounded-xl font-bold"
        onClick={() => signIn('google') }
        >
            Login with Google
        </button>
    </div>
  )
}

export default Login