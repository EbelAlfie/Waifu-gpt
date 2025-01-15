import { useContext, useEffect, useMemo, useState } from "react"
import { ChatListModel } from "./ChatBubble"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { CharacterData } from "./CharacterData"
import { ChatTurnHistory } from "@/domain/response_model/ChatTurnHistory"
import { ChatRoom } from "./ChatRoom"

type Loading = { type:"loading" }
type Loaded<T> = { type:"loaded", data: T } 
type Failed = { type:"error", error: Error }

function setLoaded<dataType>(data: dataType): Loaded<dataType> { 
    return { type:"loaded", data: data } 
}
function setLoading(): Loading { return { type:"loading" } }
function setError(error: Error): Failed { return { type:"error", error: error } }

type ChatRoomUiState = Loading | Loaded<ChatListModel[]> | Failed

type ChatRoomProps = {
    isChatOpened: Boolean
}

export const ChatRoomLayout = ({...props} : ChatRoomProps) => {
    const charId = useContext(CharacterData)
    const useCase = useMemo(() => new ChatUseCase(), [])

    const [chatRoomUiState, setChatRoomUiState] = useState<ChatRoomUiState>(setLoading())

    useEffect(() => {
        if (!props.isChatOpened) return

        const fetchInitialData = () => {
            useCase.fetchRecentChat(charId)
                .then(resultModel => {
                    useCase.loadChatHistory(resultModel.chatId)
                    .then(chatHistory => {
                        const chatList = chatHistory.map(chat => {
                            return {
                                turnId: chat.turnKey.turnId,
                                message: chat.candidates[0]?.rawContent,
                                author: chat.author,
                                createTime: chat.createTime
                            }
                        })
                        setChatRoomUiState(setLoaded(chatList.reverse()))
                    })
                })
        }

        useCase.registerOpenListener((message: Event) => {
            fetchInitialData()
        })

        useCase.registerErrorListener((message: Event) => {
            setChatRoomUiState(setError(Error("Error connecting web socket")))
        })

        useCase.registerMessageListener((turn: ChatTurnHistory) => {
            const newMessage = {
                turnId: turn.turnKey.turnId,
                message: turn.candidates[0]?.rawContent,
                author: turn.author,
                createTime: turn.createTime
            };

            if (chatRoomUiState.type !== "loaded") return 
            const newList = chatRoomUiState.data
            newList.push(newMessage)
            setChatRoomUiState(setLoaded(newList))
        })

        useCase.openWebsocketConnection()

    }, [props.isChatOpened])

    return <>
        <section className="h-screen rounded-tr-lg rounded-br-lg flex flex-col bg-slate-950 opacity-80 max-w-xl max-h-full">
            {chatRoomUiState.type === "loading" && <LoadingLottie/>}
            {chatRoomUiState.type === "loaded" && 
                <ChatRoom
                    chatUseCase={useCase}
                    chatListState={chatRoomUiState.data}
                />
            }
            {chatRoomUiState.type === "error" && <ErrorLayout/>}
        </section>
    </>
}

const LoadingLottie = () => {
    return (
        <div className="gap-80 place-self-center justify-self-center bg-black opacity-80 rounded-lg p-8">
            <div className="bg-slate-200 rounded-full"/>
        </div>
    )
}

const ErrorLayout = () => {
    return (
        <div className="self-center place-self-center justify-self-center bg-black opacity-80 rounded-lg p-8">
            
        </div>
    )
}