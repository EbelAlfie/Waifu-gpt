import { ChatUseCase } from "@/api/domain/ChatUseCase"
import axios from "axios"
import { Request, Response } from "express"

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