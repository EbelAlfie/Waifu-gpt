import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ChatListModel } from "./ChatBubble"
import { GlobalCharacterData } from "../../context/CharacterData"
import { ChatRoom } from "./ChatRoomPage"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "@/app/global/UiState"
import { CommandType } from "@/app/global/models/ConstEnum"
import { ChatListState } from "./ChatList"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { ChatTurnHistory } from "@/domain/response_model/ChatTurnHistory"
import { RecentChatModel } from "@/domain/response_model/RecentChat"
import { useChat } from "../../hooks/useChat"

export type ChatRoomUiState = Loading | Loaded<ChatListState> | Failed

type ChatRoomProps = {
    isChatOpened: Boolean
    onBackPressed: (chatOpened: Boolean) => void
}

export const ChatRoomLayout = ({...props} : ChatRoomProps) => {
    const useCase = useMemo(() => new ChatUseCase(), [])

    const chatRoomUiState = useChat(useCase, props.isChatOpened)

    return <>
        <section className="flex flex-col w-lvw max-w-screen-lg h-screen rounded-tr-lg rounded-br-lg bg-slate-950 bg-opacity-80">
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