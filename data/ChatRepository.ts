import { ChatTurnHistory, TurnResponse } from "@/domain/model/ChatTurnHistory"
import axios, { AxiosResponse } from "axios"

export class ChatRepository {
    webSocket: WebSocket | null = null

    public openChatConnection() {
        this.webSocket = new WebSocket("wss://neo.character.ai/ws/") 
        this.webSocket.onopen = this.onOpen.bind(this)
        
    }

    private onOpen() {
        
    }

    public async fetchRecentChat(characterId: string) {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/chats/recent/${characterId}`,
            headers: {
                'authorization': 'Token '
            }
        }

        return axios.request(config)
    }

    public async loadChatHistory(chatId: string) {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/turns/${chatId}/`,
            headers: {
                'authorization': 'Token '
            }
        }

        return axios.request(config)
    }

    public async sendMessage(message: string) {
        const messagePayload = {

        }
    }
}