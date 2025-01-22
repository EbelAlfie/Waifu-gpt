import { ChatRepository } from "@/app/data/ChatRepository";
import { RecentChatResponse } from "./response_model/RecentChatResponse";
import { ChatTurnHistory, parseTurn, TurnKey } from "./response_model/ChatTurnHistory";
import { ChatEventType } from "@/app/global/models/ConstEnum";

export class ChatUseCase {
    repository: ChatRepository = new ChatRepository()

    public async fetchRecentChat(characterId: string): Promise<RecentChatResponse> {
        return this.repository.fetchRecentChat(characterId)
            .then(response => {
                const data = response.data

                const chats = data?.chats ?? []
                const chat = chats[0] ?? {} //first or last?

                const result: RecentChatResponse = {
                    chatId : chat?.chat_id ?? "",
                    characterAvatar : chat?.character_avatar_uri ?? "",
                    createTime: chat?.create_time ?? "",
                    creatorId: chat?.creator_id ?? "",
                    characterId: chat?.character_id ?? "",
                }

                return result 
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    public async loadChatHistory(chatId: string): Promise<ChatTurnHistory[]> {
        return this.repository.loadChatHistory(chatId)
            .then(response => {
                const turns = response.data?.turns ?? []

                const chatData = turns.map((turn: any) => {
                    return parseTurn(turn)
                })

                return chatData
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    public openWebsocketConnection() {
        this.repository.openChatConnection()
    }

    public closeWebsocketConnection() {
        this.repository.closeConnection()
    }

    public async sendMessage(
        chatId: string,
        characterId: string,
        message: string
    ) {
        const eventType = ChatEventType.CREATE_GENERATE
        const requestId = crypto.randomUUID().slice(0, 24) + ""
        const primaryCandidateId = crypto.randomUUID() 
        const turnId = crypto.randomUUID() 

        const model = {
            command: eventType,
            request_id: requestId,
            payload: {
                num_candidates: 1,
                tts_enabled: false,
                selected_language: "",
                character_id: characterId,
                user_name: "SethAriblaze",
                turn: {
                    turn_key: {
                        turn_id: turnId,
                        chat_id: chatId
                    },
                    author: {
                        author_id: "58584831",
                        is_human: true,
                        name: "SethAriblaze"
                    },
                    candidates: [
                        {
                            candidate_id: primaryCandidateId,
                            raw_content: message
                        }
                    ],
                    primary_candidate_id: primaryCandidateId
                },
                "previous_annotations": {
                    "boring": 0,
                    "not_boring": 0,
                    "inaccurate": 0,
                    "not_inaccurate": 0,
                    "repetitive": 0,
                    "not_repetitive": 0,
                    "out_of_character": 0,
                    "not_out_of_character": 0,
                    "bad_memory": 0,
                    "not_bad_memory": 0,
                    "long": 0,
                    "not_long": 0,
                    "short": 0,
                    "not_short": 0,
                    "ends_chat_early": 0,
                    "not_ends_chat_early": 0,
                    "funny": 0,
                    "not_funny": 0,
                    "interesting": 0,
                    "not_interesting": 0,
                    "helpful": 0,
                    "not_helpful": 0
                }
            }
        }

        this.repository.sendMessage(JSON.stringify(model))
    }

    registerOpenListener(listener: (message: Event) => void) {
        this.repository.onOpen = listener
    }

    registerErrorListener(listener: (message: Event) => void) {
        this.repository.onError = listener
    }

    registerMessageListener(listener: (messageTurn: ChatTurnHistory, command: string) => void) {
        const messageParser = (message: MessageEvent) => {
            const data = JSON.parse(message?.data) ?? {}
            const command = data?.command ?? ""
            const turn = data?.turn ?? {}
            const parsedTurn = parseTurn(turn)

            listener(parsedTurn, command)
        }
        this.repository.onMessage = messageParser
    }
}