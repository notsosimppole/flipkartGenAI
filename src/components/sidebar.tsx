import NewChat from "./newChat"

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                <NewChat />
            </div>
        </div>
    </div>
  )
}

export default Sidebar