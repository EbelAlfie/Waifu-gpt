import { Request, Response } from "express"

export async function resurrectCharacter(request: Request, response: Response) {
    const {
        charId
    } = request.query

}

export async function loadRecentChat(request: Request, response: Response) {
    const {
        charId
    } = request.query

}

export async function loadChatHistory(request: Request, response: Response) {
    const {
        chatId
    } = request.query

}