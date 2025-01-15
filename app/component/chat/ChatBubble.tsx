import { useContext } from "react"
import { CharacterData } from "./CharacterData"
import { AuthorModel } from "@/domain/response_model/ChatTurnHistory"

export type ChatListModel = {
    message: string,
    author: AuthorModel,
    createTime: string
}

export const ChatBubble = ({model}: {model : ChatListModel}) => {
    const recipientId = useContext(CharacterData) 
    
    return <>
        <li className={`place-self-${recipientId === model.author.authorId ? "end" : "start"}`}>
            <div className="w-fit shadow-md rounded-lg m-2 p-2 bg-yellow-100">
                <p className="bold font-[genshin] text-slate-800">{model.message}</p>
            </div>
        </li>
    </>
}