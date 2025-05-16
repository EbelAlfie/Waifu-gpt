import { useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"
import { ChatUseCase } from "@/app/_characterai/_domain/ChatUseCase"
import { ChatList, ChatListState } from "./ChatList"
import { useCharacterContext } from "../../hooks/CharacterData"
import { ChatHeader } from "./ChatHeader"

type ChatRoomData = {
    chatUseCase: ChatUseCase,
    chatListState: ChatListState,
    onBackPressed: () => void
}

export const ChatRoom = ({...props}: ChatRoomData) => {
    const charId = useCharacterContext().characterAiData.characterId
    
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
        props.chatUseCase.sendMessage(
            props.chatListState.metadata.chatId, 
            charId, 
            textField.text
        )
    }

    return <>
        <ChatHeader onClick={props.onBackPressed}/>
        <ChatList
            className="p-8 flex flex-col flex-grow overflow-y-scroll" 
            chats={props.chatListState.chatList}
        />
        <BottomBar 
            textFieldProp={textField}
            onTyping={onType}
            onSendClicked={onSend}
        />
    </>
}