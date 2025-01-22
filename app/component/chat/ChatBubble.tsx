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
    
    return <>
        <li className={`${recipientId === model.author.authorId ? "place-self-start" : "place-self-end"}`}>
            <div className="w-fit shadow-md rounded-lg m-2 p-2 bg-yellow-100">
                <p className="bold font-[genshin] text-slate-800">{model.message}</p>
            </div>
        </li>
    </>
}