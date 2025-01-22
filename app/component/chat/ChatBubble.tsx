import { useContext } from "react"
import { GlobalCharacterData } from "./CharacterData"
import { AuthorModel } from "@/app/domain/response_model/ChatTurnHistory"

export type ChatListModel = {
    turnId: string,
    message: string,
    author: AuthorModel,
    createTime: string
}

export const ChatBubble = ({model}: {model : ChatListModel}) => {
    const recipientId = useContext(GlobalCharacterData).characterAiData.characterId

    const isCharacter = recipientId === model.author.authorId
    
    return <>
        <li className={`${isCharacter ? "place-self-start" : "place-self-end"} py-1`}>
            <div className={`${isCharacter ? "items-start" : "items-end"} flex flex-col`}>
                <p className="text_genshin text-sm text-slate-400">{model.author.name}</p>
                <div className="w-fit shadow-md rounded-lg p-2 bg-yellow-100">
                    <p className="bold font-[genshin] text-slate-800">{model.message}</p>
                </div>
            </div>
        </li>
    </>
}