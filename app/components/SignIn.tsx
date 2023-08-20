"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const SignIn = () => {
  return (
    <div
      className='flex flex-col items-center justify-center text-center'
      style={{ height: "100svh" }}
    >
      <Image
        priority
        unoptimized
        src='/logo.png'
        width={25}
        height={25}
        alt='Login Page'
        className='h-52 w-auto lg:h-40 lg:w-auto xl:h-52 xl:w-72'
      />

      <div className='mb-7 lg:mb-5 xl:mb-9'>
        <p className='text-5xl lg:text-3xl xl:text-5xl text-[#49d2cc] font-extrabold'>
          ChicChat AI
        </p>
        <p className='text-2xl lg:text-xl xl:text-2xl text-[#49d2cbd8] font-semibold'>
          AI based Conversational Outfit Generator
        </p>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className='flex bg-white items-center justify-center rounded-2xl active:bg-gray-300 p-3 shadow-lg shadow-black hover:shadow-xl transition duration-200 ease-in-out'
      >
        <Image
          unoptimized
          src='/google.png'
          width={30}
          height={30}
          alt='Google Logo'
          className='h-6 w-6 xl:h-8 xl:w-8 xl:mt-1'
        />
        <p className='text-[#757575] text-xl font-semibold pr-1 lg:pr-1.5'>
          Sign in with Google
        </p>
      </button>
    </div>
  );
};

export default SignIn;
