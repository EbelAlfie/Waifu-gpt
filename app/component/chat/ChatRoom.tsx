import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { CharacterData } from "./CharacterData"
import { ChatListModel } from "./ChatBubble"
import { ChatList } from "./ChatList"
import { ChatTurnHistory } from "@/domain/response_model/ChatTurnHistory"

type ChatRoomProps = {
    isChatOpened: Boolean
}

export const ChatRoom = ({...props} : ChatRoomProps) => {
    const useCase = useMemo(() => new ChatUseCase(), [props.isChatOpened])


    const [textField, setTextField] = useState<TextFieldProps>({
        text: "",
        placeholder: "Message here"
    })

    const onType = (message: string) => {
        const {
            placeholder
        } = textField

        setTextField({
            text: message,
            placeholder: placeholder
        })
    }

    const onSend = () => {
        if (!textField.text || textField.text === "") return 
        useCase.sendMessage(charId, textField.text)
    }

    return <>
        <section className="h-screen rounded-tr-lg rounded-br-lg flex flex-col bg-slate-950 opacity-80 max-w-xl max-h-full">
            <ChatList
                className="flex flex-col flex-grow overflow-y-scroll" 
                chats={chatListState}
            />
            <BottomBar 
                textFieldProp={textField}
                onTyping={onType}
                onSendClicked={onSend}
            />
        </section>
    </>
}