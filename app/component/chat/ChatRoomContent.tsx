import { useCallback, useContext, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"
import { ChatUseCase } from "@/domain/ChatUseCase"
import { ChatListModel } from "./ChatBubble"
import { ChatList } from "./ChatList"
import { GlobalCharacterData } from "./CharacterData"

type ChatRoomData = {
    chatUseCase: ChatUseCase,
    chatListState: ChatListModel[]
}

export const ChatRoom = ({...props}: ChatRoomData) => {
    const charId = useContext(GlobalCharacterData).characterAiData.characterId
    
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
        props.chatUseCase.sendMessage(charId, textField.text)
    }

    return <>
        <ChatList
            className="p-8 flex flex-col flex-grow overflow-y-scroll" 
            chats={props.chatListState}
        />
        <BottomBar 
            textFieldProp={textField}
            onTyping={onType}
            onSendClicked={onSend}
        />
    </>
}