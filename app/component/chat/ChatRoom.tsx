import { useEffect, useMemo, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { ChatListModel } from "./ChatListState"

type ChatRoomProps = {
    isChatOpened: Boolean
}
export const ChatRoom = ({...props} : ChatRoomProps) => {
    const [chatListState, setChatList] = useState<ChatListModel[]>([])
    
    const useCase = useMemo(() => new ChatUseCase(), [props.isChatOpened])
    useEffect(() => {
        // if (!props.isChatOpened) return
        useCase.fetchRecentChat("BlmjOrRW8fhjbCx6iG5saWgDJtz6VtpXOcEnLZy05YE")
            .then(resultModel => {
                useCase.loadChatHistory(resultModel.chatId)
                .then(chatHistory => {
                    const chatList = chatHistory.map(chat => {
                        console.log(chat.candidates)
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
                className="flex-grow" 
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
    const chatBubble = props.chats.map(item =>  
        <li><p>{item.message}</p></li>
    )
    
    return (
        <section className={props.className}>
            <ul>
                {chatBubble}
            </ul>
        </section>
    )
}