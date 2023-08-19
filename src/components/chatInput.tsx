'use client'
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type Props = {}

const ChatInput = (props: Props) => {
    const [prompt, setPrompt] = useState("")
  return (
    <form className="p-5 space-x-5 flex items-center justify-center w-full">
        <input type="text" placeholder="Ask me anything you want to wear!" className="h-full w-full px-4 rounded-xl"
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" className="flex items-center bg-[#42d8a6] p-3 rounded-xl">
            <PaperAirplaneIcon className="h-6 w-6 text-blue-500 font-thin uppercase" />
        </button>
    </form>
  )
}

export default ChatInput