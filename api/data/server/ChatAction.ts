"use server"

import axios from "axios"

export async function resurrectCharacter(charId: string, token: string| undefined) {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chat/${charId}/resurrect`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return axios.request(config)
}

export async function fetchRecentChat(characterId: string, token: string|undefined) {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chats/recent/${characterId}`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return axios.request(config)
}

export async function loadChatHistory(chatId: string, token: string| undefined) {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/turns/${chatId}/`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return axios.request(config)
}