"use server";

import { ChatUseCase } from "@/api/domain/ChatUseCase";

export async function resurrectCharacter(chatId: string) {
    const chatUsecase = new ChatUseCase()
    
    const resp = await chatUsecase.resurectCharacter(chatId)
    console.log("AAA " + resp)

    return JSON.stringify("")
}

export async function fetchRecentChat(characterId: string) {
    const chatUsecase = new ChatUseCase()
    
    const resp = await chatUsecase.fetchRecentChat(characterId)
    console.log("AAA " + resp)

    return JSON.stringify(resp)
}

export async function loadChatHistory(chatId: string) {
    const chatUsecase = new ChatUseCase()
    
    const resp = await chatUsecase.loadChatHistory(chatId)
    console.log("AAA " + resp)
    return JSON.stringify(resp)
}