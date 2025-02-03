import axios from "axios"
import { fetchRecentChat, loadChatHistory, resurrectCharacter } from "./server/ChatAction"

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
        return resurrectCharacter(charId, this.token)
    }

    public async fetchRecentChat(characterId: string) {
        return fetchRecentChat(characterId, this.token)
    }

    public async loadChatHistory(chatId: string) {
        return loadChatHistory(chatId, this.token)
    }
}