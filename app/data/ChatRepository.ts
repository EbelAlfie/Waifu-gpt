import axios from "axios"

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

    public async fetchRecentChat(characterId: string) {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/chats/recent/${characterId}`,
            headers: {
                'authorization': `Token ${this.token}`
            }
        }

        return axios.request(config)
    }

    public async loadChatHistory(chatId: string) {
        const config = {
            method: "GET",
            url: `https://neo.character.ai/turns/${chatId}/`,
            headers: {
                'authorization': `Token ${this.token}`
            }
        }

        return axios.request(config)
    }
}