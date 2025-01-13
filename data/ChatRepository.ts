export class ChatRepository {
    webSocket: WebSocket | null = null

    public openChatConnection() {
        this.webSocket = new WebSocket("wss://neo.character.ai/ws/") 
        this.webSocket.onopen = this.onOpen.bind(this)

    }

    private onOpen() {
        
    }

    public async loadChatHistory(characterId: string) {
        const config = {
            url : ``
        }

        return 
    }
}