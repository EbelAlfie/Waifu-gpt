import { useContext } from "react"
import { GlobalCharacterData } from "../../hooks/CharacterData"
import { Avatar } from "./Avatar"
import { AuthorModel } from "@/domain/response_model/ChatTurnHistory"

export type ChatListModel = {
    turnId: string,
    message: string,
    author: AuthorModel,
    authorAvatar: string,
    createTime: string
}

export const ChatBubble = ({model}: {model : ChatListModel}) => {
    const recipientId = useContext(GlobalCharacterData).characterAiData.characterId

    const baseAvatarUrl = "https://characterai.io/i/80/static/avatars/"
    const isCharacter = recipientId === model.author.authorId
    
    return <>
        <li className={`${isCharacter ? "place-self-start" : "place-self-end"} py-1 max-w-3xl`}>
            <div className={`${isCharacter ? "items-start" : "items-end"} flex flex-col`}>
                <p className="text_genshin text-sm text-slate-400">{model.author.name}</p>
                <div className={`${isCharacter ? "flex-row" : "flex-row-reverse"} flex gap-2`}>
                    <Avatar url={`${baseAvatarUrl}${model.authorAvatar}`}/>
                    <p className="w-fit h-fit shadow-md rounded-lg p-2 bg-yellow-100 bold font-[genshin] text-slate-800">
                        {model.message}
                    </p>
                </div>
            </div>
        </li>
    </>
}