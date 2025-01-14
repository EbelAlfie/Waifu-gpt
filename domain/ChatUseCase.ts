import { ChatRepository } from "@/data/ChatRepository";
import { RecentChatResponse } from "./model/RecentChatResponse";
import { ChatTurnHistory, TurnKey } from "./model/ChatTurnHistory";
import { AxiosResponse } from "axios";
import { Any } from "@react-spring/three";

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
                const turns = response.data.turns

                const chatData = turns.map((turn: any) => {
                    const turn_key = turn?.turn_key ?? {}
                    const turnKey: TurnKey = {
                        chatId: turn_key?.chat_id ?? "",
                        turnId: turn_key?.turn_id ?? ""
                    }
                    const author = {
                        authorId: turn.author.author_id,
                        isHuman: turn.author.is_human ?? false,
                        name: turn.author.name
                    }

                    const candidates = turn.candidates.map((item: any) => {
                        const candidateData = {
                            candidateId: item.candidate_id,
                            createTime: item.create_time,
                            rawContent: item.raw_content,
                            isFinal: item.is_final
                        }
                        return candidateData
                    })
                    return {
                        turnKey: turnKey,
                        createTime: turn.create_time,
                        lastUpdatedTime: turn.last_updated_time,
                        state: turn.state,
                        author: author,
                        candidates: candidates,
                        primaryId: turn.primary_id
                    }
                })

                return chatData
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    public async sendMessage(message: string) {
        const model = {
            "command": "create_and_generate_turn",
            "request_id": "61a627fa-a41f-47c6-bd4c-XOcEnLZy05YE",
            "payload": {
                "num_candidates": 1,
                "tts_enabled": false,
                "selected_language": "",
                "character_id": "BlmjOrRW8fhjbCx6iG5saWgDJtz6VtpXOcEnLZy05YE",
                "user_name": "SethAriblaze",
                "turn": {
                    "turn_key": {
                        "turn_id": "00549e37-adb9-4b69-809e-db6689078af2",
                        "chat_id": "83c7ae9e-f153-4d67-9f27-3d1accb53b95"
                    },
                    "author": {
                        "author_id": "58584831",
                        "is_human": true,
                        "name": "SethAriblaze"
                    },
                    "candidates": [
                        {
                            "candidate_id": "24baaab4-c0bd-42b7-b746-61691d94d58c",
                            "raw_content": "Ping"
                        }
                    ],
                    "primary_candidate_id": "24baaab4-c0bd-42b7-b746-61691d94d58c"
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

        // this.repository.sendMessage(model)
    }
}

// const temp = (response: AxiosResponse<Any, Any>) => {
//     const data = response?.data ?? {}

//     const turns = data.turns ?? []

//     const chatData = turns.map(turn => {
//     const turn_key = turn?.turn_key ?? {}
//     const turnKey = {

//     }
//     const chat: ChatTurnHistory = {
//         turnKey: TurnKey,
//         createTime: string,
//         lastUpdatedTime: string,
//         state: string,
//         author: AuthorModel,
//         canditates: CandidatesModel,
//         primaryId: string
//     }
//     })
// }