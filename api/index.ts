import express from "express"
import { ChatHistory, RecentChat, ResurectRoute } from "./router/ChatAiRoute"

const api = express()

api.get(ResurectRoute.name, ResurectRoute.controller)
api.get(RecentChat.name, RecentChat.controller)
api.get(ChatHistory.name, ChatHistory.controller)

console.log("Listening on 4000")
api.listen("4000", () => {
    console.log("Listening")
})