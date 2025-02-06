import express from "express"
import { Chat, ChatHistory, RecentChat, ResurectRoute } from "./router/ChatAiRoute"
import expressWs from "express-ws"
import WebSocket from "ws"

const api = express()
const apiWs = expressWs(api)

api.get(ResurectRoute.name, ResurectRoute.controller)
api.get(RecentChat.name, RecentChat.controller)
api.get(ChatHistory.name, ChatHistory.controller)

apiWs.app.ws(Chat.name, (ws: WebSocket, req: express.Request, next: express.NextFunction) => {
    Chat.controller(ws)
})

console.log("Listening on 4000")
api.listen("4000", () => {
    console.log("Listening")
})