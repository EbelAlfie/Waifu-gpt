import { useCallback, useEffect, useRef } from "react"
import { ChatBubble, ChatListModel } from "./ChatBubble"

export type ChatListState = {
    chatId: string,
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