import { ChatBubble, ChatListModel } from "./ChatBubble"

type ChatListProps = { 
    className?: string
    chats: ChatListModel[]
}

export const ChatList = ({...props}: ChatListProps) => {
    console.log(props.chats)
    const chatBubble = props.chats.map((item, index) =>  
        <ChatBubble model={item} key={index}/>
    )
    
    return (
        <ul className={props.className}>
            {chatBubble}
        </ul>
    )
}