import { HTMLAttributes, useMemo, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"

export const ChatRoom = () => {

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

    }

    return <>
        <section className="h-screen rounded-tr-lg rounded-br-lg flex flex-col bg-slate-950 opacity-80 max-w-lg max-h-full">
            <ChatList className="flex-grow" />
            <BottomBar 
                textFieldProp={textField}
                onTyping={onType}
                onSendClicked={onSend}
            />
        </section>
    </>
}

type ChatListProps = { 
    className?: string
    chatList?: string[]
}

const ChatList = ({...props}: ChatListProps) => {
    const chatBubble = useMemo(() => props?.chatList, [])
    
    return <>
        <section className={props.className}>
            <li>
                
            </li>
        </section>
    </>
}