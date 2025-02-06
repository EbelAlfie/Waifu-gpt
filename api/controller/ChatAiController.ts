import { ChatUseCase } from "@/api/domain/ChatUseCase"
import { Request, Response } from "express"
import WebSocket from "ws"

const chatAiUseCase = new ChatUseCase()

export async function resurrectCharacter(request: Request, response: Response) {
    const {
        charId
    } = request.query

    const result = await chatAiUseCase.resurectCharacter(charId?.toString() ?? "")

    response.send(result.data)
}

export async function loadRecentChat(request: Request, response: Response) {
    const {
        charId
    } = request.query

    const result = await chatAiUseCase.fetchRecentChat(charId?.toString() ?? "")

    response.send(result)
}

export async function loadChatHistory(request: Request, response: Response) {
    const {
        chatId
    } = request.query

    const result = await chatAiUseCase.loadChatHistory(chatId?.toString() ?? "")

    response.send(result)
}

export async function chat(ws: WebSocket) {
    ws.on("message", (event: MessageEvent) => {
        console.log("Message")
    })
}