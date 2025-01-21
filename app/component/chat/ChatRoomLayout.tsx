import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ChatListModel } from "./ChatBubble"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { GlobalCharacterData } from "./CharacterData"
import { ChatTurnHistory } from "@/domain/response_model/ChatTurnHistory"
import { ChatRoom } from "./ChatRoomContent"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "@/global/UiState"
import { CommandType } from "@/global/models/ConstEnum"

type ChatRoomUiState = Loading | Loaded<ChatListModel[]> | Failed

type ChatRoomProps = {
    isChatOpened: Boolean
    onBackPressed: (chatOpened: Boolean) => void
}

export const ChatRoomLayout = ({...props} : ChatRoomProps) => {
    const character = useContext(GlobalCharacterData)

    const useCase = useMemo(() => new ChatUseCase(), [])

    const [chatRoomUiState, setChatRoomUiState] = useState<ChatRoomUiState>(setLoading())
    
    const uiStateRef = useRef(chatRoomUiState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatRoomUiState},[chatRoomUiState])

    useEffect(() => {
        if (!props.isChatOpened) return

        const fetchInitialData = async () => {
            const chatData = await useCase.fetchRecentChat(character.characterAiData.characterId)
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

        useCase.registerOpenListener((message: Event) => fetchInitialData())

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
        <section className="flex flex-col w-lvw max-w-xl h-screen rounded-tr-lg rounded-br-lg bg-slate-950 opacity-80">
            {chatRoomUiState.type === "loading" && <LoadingLottie/>}
            {chatRoomUiState.type === "loaded" && 
                <ChatRoom
                    chatUseCase={useCase}
                    chatListState={chatRoomUiState.data}
                    onBackPressed={() => { props.onBackPressed(!props.isChatOpened) }}
                />
            }
            {chatRoomUiState.type === "error" && <ErrorLayout errorMessage={chatRoomUiState.error.message}/>}
        </section>
    </>
}

const LoadingLottie = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-black rounded-lg p-8">
                <div className="rounded-full w-50 h-50 loading-spinner p-8"/>
            </div>
        </div>
    )
}

const ErrorLayout = ({errorMessage}: {errorMessage: string}) => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="self-center place-self-center justify-self-center bg-black opacity-80 rounded-lg p-8">
                <h3 className="text_genshin">{errorMessage}</h3>
            </div>
        </div>
    )
}