import ChatInput from "./chatInput"

type Props = {}

const ChatPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
      chats
      <ChatInput />
    </div>
  )
}

export default ChatPage