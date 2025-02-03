import express from "express"
import { ChatHistory, RecentChat, ResurectRoute } from "./router/ChatAiRoute"

const api = express()

export function setupApi() {
    
    api.get(ResurectRoute.name, ResurectRoute.controller)
    api.get(RecentChat.name, RecentChat.controller)
    api.get(ChatHistory.name, ChatHistory.controller)
    
    api.listen("4000", () => {
        console.log("Listening")
    })
}