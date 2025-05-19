"use server";
import { RecentChatResponse } from "@/app/_characterai/_data/model/RecentChatResponse";
import { TurnResponse } from "@/app/_characterai/_data/model/TurnResponse";
import axios, { AxiosResponse } from "axios";

export async function resurrectCharacter(chatId: string, token: string|undefined) {
    const config = {
        method: "GET",
        url: `https://character.ai/_next/data/HGcv53b-dcxEBHfVVp7IK/chat/${chatId}.json?character=${chatId}`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request(config)
        .then(response => response.data)
}

export async function fetchRecentChat(characterId: string, token: string|undefined): Promise<RecentChatResponse> {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chats/recent/${characterId}`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request<any, AxiosResponse<RecentChatResponse>, any>(config)
        .then(response => response.data)
}

export async function loadChatHistory(chatId: string, token: string|undefined): Promise<TurnResponse> {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/turns/${chatId}/`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request<any, AxiosResponse<TurnResponse>, any>(config)
        .then(response => response.data)
}