import { ChatUseCase } from "@/app/_domain/ChatUseCase";
import { useEffect, useRef, useState } from "react";
import { ChatRoomUiState } from "../component/chat/ChatRoomLayout";
import { setError, setLoaded, setLoading } from "@/app/global/UiState";
import { RecentChatModel } from "@/app/_domain/response_model/RecentChat";
import { ChatTurnHistory } from "@/app/_domain/response_model/ChatTurnHistory";
import { ChatListModel } from "../component/chat/ChatBubble";
import { CommandType } from "@/app/global/ConstEnum";
import { useCharacterContext } from "@/app/hooks/CharacterData";

export const useChat = (
    useCase: ChatUseCase,
    openChat: Boolean,
): ChatRoomUiState => {
    const character = useCharacterContext()
    const [chatRoomUiState, setChatRoomUiState] = useState<ChatRoomUiState>(setLoading())

    const uiStateRef = useRef(chatRoomUiState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatRoomUiState},[chatRoomUiState])

    useEffect(() => {
        if (!openChat) {
            useCase.closeWebsocketConnection()
            return
        }
        setChatRoomUiState(setLoading())

        let chatData: RecentChatModel
        
        const openWebsocket = async () => {
            const recentChat = await useCase.fetchRecentChat(character.characterAiData.characterId)
            if (recentChat instanceof Error) {
                setChatRoomUiState(setError(recentChat))
                return 
            }

            chatData = recentChat
            const resurrect = await useCase.resurectCharacter(recentChat.chatId)
            if (resurrect instanceof Error) {
                setChatRoomUiState(setError(resurrect))
                return 
            }

            useCase.registerOpenListener(() => fetchInitialData())

            useCase.registerErrorListener((message: Event) => {
                setChatRoomUiState(setError(Error(JSON.stringify(message))))
            })

            useCase.registerMessageListener((turn: ChatTurnHistory, command: string) => {
                const currentState = uiStateRef.current
                if (currentState.type !== "loaded") return 

                const isCharMessage = 
                    turn.author.authorId === character.characterAiData.characterId
                
                const uiState =  currentState.data

                const newMessage: ChatListModel = {
                    turnId: turn.turnKey.turnId,
                    message: turn.candidates[0]?.rawContent,
                    author: turn.author,
                    authorAvatar: isCharMessage ? uiState.metadata.characterAvatar : "",
                    createTime: turn.createTime
                };
                
                const newList = uiState.chatList

                switch(command) {
                    case CommandType.ADD : {
                        newList.push(newMessage)
                        
                        uiState.chatList = newList
                        setChatRoomUiState(setLoaded(uiState))
                        break
                    }
                    case CommandType.UPDATE : {
                        const updateIndex = newList.findIndex(item => 
                            item.turnId === newMessage.turnId
                        )  
                        if (updateIndex > -1) newList[updateIndex] = newMessage

                        uiState.chatList = newList
                        setChatRoomUiState(setLoaded(uiState))
                        break
                    }
                }
            })

            useCase.openWebsocketConnection()
        }

        const fetchInitialData = async () => {
            const chatHistory = await useCase.loadChatHistory(chatData.chatId)
            if (chatHistory instanceof Error) {
                setChatRoomUiState(setError(chatHistory))
                return 
            }

            const chatList: ChatListModel[] = chatHistory.map(chat => {
                const isCharMessage = chat.author.authorId === character.characterAiData.characterId
                return {
                    turnId: chat.turnKey.turnId,
                    message: chat.candidates[0]?.rawContent,
                    author: chat.author,
                    authorAvatar: isCharMessage? chatData.characterAvatar : "",
                    createTime: chat.createTime
                }
            })
            setChatRoomUiState(setLoaded(
                {
                    metadata: chatData,
                    chatList: chatList.reverse()
                }
            ))    
        }

        openWebsocket()

        return () => {
            if (openChat) return 
            useCase.closeWebsocketConnection()
            setChatRoomUiState(setLoading())
        }
    }, [openChat])

    return chatRoomUiState
}