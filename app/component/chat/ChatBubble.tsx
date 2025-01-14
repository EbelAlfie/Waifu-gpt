import { useContext } from "react"
import { ChatListModel } from "./ChatListState"
import { CharacterData } from "./CharacterData"

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