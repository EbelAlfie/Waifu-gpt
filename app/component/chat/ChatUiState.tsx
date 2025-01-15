import { useContext, useEffect, useMemo, useState } from "react"
import { ChatListModel } from "./ChatBubble"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { CharacterData } from "./CharacterData"

type Loading = "loading"
type Loaded = ChatListModel[]
type Failed = Error

type ChatRoomProps = {
    isChatOpened: Boolean
}

const ChatRoomLayout = ({...props} : ChatRoomProps
    
) => {
    const charId = useContext(CharacterData)

    const useCase = useMemo(() => new ChatUseCase(), [])

    const [chatListState, setChatList] = useState<ChatListModel[]>([])

    useEffect(() => {
        if (!props.isChatOpened) return

        useCase.registerMessageListener((turn: ChatTurnHistory) => {
            console.log(turn)
            const newMessage = {
                message: turn.candidates[0]?.rawContent,
                author: turn.author,
                createTime: turn.createTime
            }
            setChatList([...chatListState, newMessage])
        })

        useCase.openWebsocketConnection()
        return () => {
            //Stop listening
        }
    }, [props.isChatOpened])
    
    useEffect(() => { //fetch initial history
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

    
}

const LoadingLottie = () => {
    return (
        <div className="bg-black opacity-80 rounded-lg p-8">
            <div className="bg-slate-200 rounded-full"/>
        </div>
    )
}

const ErrorLayout = () => {
    return (

    )
}