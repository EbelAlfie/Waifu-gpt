import express from "express"
import { CharacterDetail, CharacterList } from "./router/ChatAiRoute"

const api = express()

//api.use(cors())
api.get(CharacterList.name, CharacterList.controller)
api.get(CharacterDetail.name, CharacterDetail.controller)

console.log("Listening on 4000")
api.listen("4000", () => {
    console.log("Listening")
})