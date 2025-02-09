"use server";
import { RecentChatResponse } from "@/data/model/RecentChatResponse";
import { TurnResponse } from "@/data/model/TurnResponse";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GeneralError } from "../model/GeneralError";

export async function resurrectCharacter(chatId: string, token: string|undefined) {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chat/${chatId}/resurrect`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request(config)
        .then(response => response.data)
        .catch((error: AxiosError) => {
            console.log(error.response)
            return {
                code: error?.code,
                message: error.message
            }
        })
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
        // .catch((error: AxiosError) => {
        //     console.log(error.response)
        //     return {
        //         code: error?.code,
        //         name: error.name,
        //         message: error.message
        //     }
        // })
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
        // .catch((error: AxiosError) => {
        //     console.log(error.response)
        //     return {
        //         code: error?.code,
        //         name: error.name,
        //         message: error.message
        //     }
        // })
}