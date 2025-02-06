import axios, { AxiosResponse } from "axios"
import { RecentChatResponse } from "./model/RecentChatResponse"
import { TurnResponse } from "./model/TurnResponse"
import { fetchRecentChat, loadChatHistory, resurrectCharacter } from "@/app/component/chat/action/ChatAction"

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

    public async resurectCharacter(chatId: string) {
        const response = resurrectCharacter(chatId, this.token)
        return axios.request(config)
    }

    public async fetchRecentChat(characterId: string): Promise<AxiosResponse<RecentChatResponse, any>> {
        const response = fetchRecentChat(characterId, this.token)
        return axios.request<any, AxiosResponse<RecentChatResponse>, any>(config)
    }

    public async loadChatHistory(chatId: string): Promise<AxiosResponse<TurnResponse, any>> {
        const response = loadChatHistory(chatId, token)
        return axios.request<any, AxiosResponse<TurnResponse>, any>(config)
    }
}