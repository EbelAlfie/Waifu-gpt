import { useEffect, useRef } from "react"
import { ChatBubble, ChatListModel } from "./ChatBubble"
import { RecentChatModel } from "@/app/_characterai/_domain/response_model/RecentChat"

export type ChatListState = {
    metadata: RecentChatModel,
    chatList: ChatListModel[]
}

type ChatListProps = { 
    className?: string
    chats: ChatListModel[]
}

export const ChatList = ({...props}: ChatListProps) => {
    const listRef = useRef<HTMLUListElement>(null)

    const chatBubble = props.chats.map((item, index) =>  
        <ChatBubble model={item} key={index}/>
    )
    
    useEffect(() => {
        if (!listRef) return
        
        listRef.current && (listRef.current.scrollTop = listRef.current.scrollHeight)
    }, [listRef, chatBubble])

    return (
        <ul ref={listRef} className={props.className}>
            {chatBubble}
        </ul>
    )
}