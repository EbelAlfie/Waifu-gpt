import { Request, Response } from "express"
import { loadRecentChat, loadChatHistory, resurrectCharacter } from "../controller/ChatAiController"

type RouteModel = { 
    name: string,
    controller: (request: Request, response: Response) => void
}

export const ResurectRoute: RouteModel = {
    name: "/resurrect",
    controller: resurrectCharacter
}

export const RecentChat: RouteModel = {
    name: "/recent-chat",
    controller: loadRecentChat
}

export const ChatHistory: RouteModel = {
    name: "/chat-history",
    controller: loadChatHistory
}