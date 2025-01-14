import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { ChatListModel } from "./ChatListState"
import { CharacterData } from "./CharacterData"
import { ChatBubble } from "./ChatBubble"

type ChatRoomProps = {
    isChatOpened: Boolean
}
export const ChatRoom = ({...props} : ChatRoomProps) => {
    const charId = useContext(CharacterData)

    const [chatListState, setChatList] = useState<ChatListModel[]>([])
    
    const useCase = useMemo(() => new ChatUseCase(), [props.isChatOpened])
    useEffect(() => {
        if (!props.isChatOpened) return
        useCase.fetchRecentChat(charId)
            .then(resultModel => {
                useCase.loadChatHistory(resultModel.chatId)
                .then(chatHistory => {
                    const chatList = chatHistory.map(chat => {
                        return {
                            message: chat.candidates[0]?.rawContent,
                            author: chat.author,
                            createTime: chat.createTime
                        }
                    })
                    setChatList(chatList)
                })
            })
    }, [props.isChatOpened])


    const [textField, setTextField] = useState<TextFieldProps>({
        text: "",
        placeholder: "Message here"
    })

    const onType = (message: string) => {
        const {
            placeholder
        } = textField

        setTextField({
            text: message,
            placeholder: placeholder
        })
    }

    const onSend = () => {

    }

    return <>
        <section className="h-screen rounded-tr-lg rounded-br-lg flex flex-col bg-slate-950 opacity-80 max-w-lg max-h-full">
            <ChatList 
                className="flex flex-col flex-grow overflow-y-scroll" 
                chats={chatListState}
            />
            <BottomBar 
                textFieldProp={textField}
                onTyping={onType}
                onSendClicked={onSend}
            />
        </section>
    </>
}

type ChatListProps = { 
    className?: string
    chats: ChatListModel[]
}

const ChatList = ({...props}: ChatListProps) => {
    const chatBubble = props.chats.map((item, index) =>  
        <ChatBubble model={item} key={index}/>
    )
    
    return (
        <ul className={props.className}>
            {chatBubble}
        </ul>
    )
}