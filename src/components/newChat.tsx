import { PlusIcon } from "@heroicons/react/24/outline"

type Props = {}

const NewChat = (props: Props) => {
  return (
    <div className="flex items-center justify-center border-gray-400 rounded-lg border-2 w-full p-2 chatRow">
        <PlusIcon className="h-4 w-4"/>
        <p> New Chat </p>
    </div>
  )
}

export default NewChat