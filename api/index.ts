import express from "express"
import cors from "cors"
import { CharacterDetail, CharacterList } from "./router/ChatAiRoute"
import dotenv from "dotenv"

const api = express()
dotenv.config()

api.use(cors())
api.get(CharacterList.name, CharacterList.controller)
api.get(CharacterDetail.name, CharacterDetail.controller)

console.log("Listening on 4000")
api.listen("4000", () => {
    console.log("Listening")
})