import axios, { AxiosResponse } from "axios"
import { RecentChatResponse } from "./model/RecentChatResponse"
import { TurnResponse } from "./model/TurnResponse"

export class ChatRepository {
    webSocket: WebSocket | null = null
    token: string| undefined = process.env.NEXT_PUBLIC_TOKEN

    public onMessage(event: MessageEvent) {}
    
    public onOpen(event: Event) { }

    public onError(event: Event) { }

    public sendMessage(message: string) {
        this.webSocket?.send(message)
    }

    public openChatConnection() {
        this.webSocket = new WebSocket("wss://neo.character.ai/ws/") 
        this.webSocket.onopen = this.onOpen.bind(this)
        this.webSocket.onmessage = this.onMessage.bind(this)
        this.webSocket.onerror = this.onError.bind(this)  
    }

    public closeConnection() {
        this.webSocket?.close()
        this.webSocket = null
    }

    public async resurectCharacter(charId: string) {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/chat/${charId}/resurrect`,
            headers: {
                'authorization': `Token ${this.token}`
            }
        }
    
        return axios.request(config)
    }

    public async fetchRecentChat(characterId: string): Promise<AxiosResponse<RecentChatResponse, any>> {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/chats/recent/${characterId}`,
            headers: {
                'authorization': `Token ${this.token}`
            }
        }
    
        return axios.request<any, AxiosResponse<RecentChatResponse>, any>(config)
    }

    public async loadChatHistory(chatId: string): Promise<AxiosResponse<TurnResponse, any>> {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/turns/${chatId}/`,
            headers: {
                'authorization': `Token ${this.token}`
            }
        }
    
        return axios.request<any, AxiosResponse<TurnResponse>, any>(config)
    }
}