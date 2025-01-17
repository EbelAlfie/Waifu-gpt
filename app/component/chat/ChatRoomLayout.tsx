import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ChatListModel } from "./ChatBubble"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { CharacterData } from "./CharacterData"
import { ChatTurnHistory } from "@/domain/response_model/ChatTurnHistory"
import { ChatRoom } from "./ChatRoomContent"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "@/global/UiState"
import { CommandType } from "@/models/ConstEnum"

type ChatRoomUiState = Loading | Loaded<ChatListModel[]> | Failed

type ChatRoomProps = {
    isChatOpened: Boolean
}

export const ChatRoomLayout = ({...props} : ChatRoomProps) => {
    const charId = useContext(CharacterData)
    const useCase = useMemo(() => new ChatUseCase(), [])

    const [chatRoomUiState, setChatRoomUiState] = useState<ChatRoomUiState>(setLoading())
    
    const uiStateRef = useRef(chatRoomUiState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatRoomUiState},[chatRoomUiState])

    useEffect(() => {
        if (!props.isChatOpened) return

        const fetchInitialData = async () => {
            const chatData = await useCase.fetchRecentChat(charId)
            if (chatData instanceof Error) {
                setChatRoomUiState(setError(chatData))
                return 
            }

            const chatHistory = await useCase.loadChatHistory(chatData.chatId)
            if (chatHistory instanceof Error) {
                setChatRoomUiState(setError(chatHistory))
                return 
            }

            const chatList = chatHistory.map(chat => {
                return {
                    turnId: chat.turnKey.turnId,
                    message: chat.candidates[0]?.rawContent,
                    author: chat.author,
                    createTime: chat.createTime
                }
            })
            setChatRoomUiState(setLoaded(chatList.reverse()))    
        }

        useCase.registerOpenListener((message: Event) => fetchInitialData)

        useCase.registerErrorListener((message: Event) => {
            setChatRoomUiState(setError(Error("Error connecting web socket")))
        })

        useCase.registerMessageListener((turn: ChatTurnHistory, command: string) => {
            if (uiStateRef.current.type !== "loaded") return 

            const newMessage = {
                turnId: turn.turnKey.turnId,
                message: turn.candidates[0]?.rawContent,
                author: turn.author,
                createTime: turn.createTime
            };
            
            const currentState = uiStateRef.current

            const newList = currentState.data

            switch(command) {
                case CommandType.ADD : {
                    newList.push(newMessage)
                    setChatRoomUiState(setLoaded(newList))
                    break
                }
                case CommandType.UPDATE : {
                    const updateIndex = newList.findIndex(item => 
                        item.turnId === newMessage.turnId
                    )
                    
                    if (updateIndex > -1) newList[updateIndex] = newMessage

                    setChatRoomUiState(setLoaded(newList))
                    break
                }
            }
        })

        useCase.openWebsocketConnection()

        return () => {
            if (props.isChatOpened) return 
            useCase.closeWebsocketConnection()
            setChatRoomUiState(setLoading())
        }
    }, [props.isChatOpened])

    return <>
        <section className="w-lvw h-screen rounded-tr-lg rounded-br-lg flex flex-col bg-slate-950 opacity-80 max-w-xl max-h-full">
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
        <div className="place-self-center justify-self-center bg-green-300 rounded-lg p-8">
            <div className="border-white border-spacing-2 rounded-full w-10 h-10"/>
        </div>
    )
}

const ErrorLayout = () => {
    return (
        <div className="self-center place-self-center justify-self-center bg-black opacity-80 rounded-lg p-8">
            
        </div>
    )
}