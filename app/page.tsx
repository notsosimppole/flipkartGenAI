"use client";

import { db } from "@/firebase/firebase";

import {
  BoltIcon,
  ExclamationTriangleIcon,
  PlusCircleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { CircleStackIcon, LockClosedIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  const [messages] = useCollection(
    session && chats?.docs.length
      ? query(
          collection(
            db,
            "users",
            session.user?.email!,
            "chats",
            chats?.docs[chats.docs.length - 1].id!,
            "messages"
          ),
          orderBy("createdAt", "asc")
        )
      : null
  );

  const createChat = async () => {
    if (!messages?.empty) {
      const doc = await addDoc(
        collection(db, "users", session?.user?.email!, "chats"),
        {
          // messages: [],
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
        }
      );

      router.push(`/chat/${doc.id}`);
    }
  };

  return (
    <div
      className='flex flex-col items-center justify-center text-gray-700 dark:text-gray-300 md:px-9 w-full'
      style={{ height: "100svh" }}
    >
      <div className='sticky top-0 md:hidden bg-[#343541] w-full'>
        <div className='flex relative items-center text-gray-300 space-x-5 h-11'>
          <div className='flex inset-y-0 m-auto'>
            <button
              onClick={createChat}
              className='absolute right-5'
              disabled={loading}
            >
              <PlusCircleIcon className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      <div className='overflow-x-hidden overflow-y-auto scrollbar-none md:scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-[#202123] scrollbar-thumb-rounded-lg'>
        <h1 className='text-5xl text-center font-semibold mb-9 mt-9 md:mt-0'>
          ChicChat AI
        </h1>

        <div className='flex flex-col items-center justify-center space-y-5 w-full'>
          <h2 className='text-2xl text-[#64CCC5] text-center font-semibold'>
            AI based Conversational Outfit Generator
          </h2>

          <div className="grid grid-cols-3 gap-x-12 place-content-start">
            <div className='flex flex-col items-center justify-center space-y-5'>
              <RocketLaunchIcon className='h-10 w-10' />
              <h3 className="text-2xl text-center font-semibold">
                How to use: <br />
              </h3>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                Create a new stack, and just ask ChicChat AI to generate an outfit for you and it will
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                Once you like the outfit, you can see the details of the outfit and ChicChat will generate the outfit picture for you
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                You can buy related products from the outfit by clicking on product links
              </p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-5'>
              <CircleStackIcon className='h-10 w-10' />
              <h3 className="text-2xl text-center font-semibold">
                TechStack we use: <br />
              </h3>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                On the frontend, we use ReactJS, NextJS and TailwindCSS for the UI
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                On the backend, we use Firebase for authentication, and chat database. We also use Digital Ocean and Docker for deployment
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                We use GPT-3 for conversation, stable diffusion for image generation, and vector database for product search
              </p>
            </div>
            <div className='flex flex-col items-center justify-center space-y-5'>
              <LockClosedIcon className='h-10 w-10' />
              <h3 className="text-2xl text-center font-semibold">
                Future of this product: <br />
              </h3>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                We have unlimited potential to expand this product, and we are planning to do so as well
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                This can be used for many purposes, such as generating outfits,or fashion tips etc.
              </p>
              <p className="flex bg-slate-300 dark:bg-gray-500 opacity-80 rounded-xl p-4">
                We can also use this to generate outfits for different occasions, such as weddings, parties, etc.
              </p>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default HomePage;
