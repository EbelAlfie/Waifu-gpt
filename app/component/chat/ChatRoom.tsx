import { HTMLAttributes, useState } from "react"
import { BottomBar, TextFieldProps } from "./BottomBar"

export const ChatRoom = () => {

    const [textField, setTextField] = useState<TextFieldProps>({
        text: "",
        placeholder: "Message here"
    })

    const onType = (message: string) => {

    }

    const onSend = () => {

    }

    return <>
        <section className="h-screen flex flex-col bg-slate-900 opacity-55 max-w-lg max-h-full">
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
}

const ChatList = ({...props}: ChatListProps) => {
    return <>
        <section className={props.className}>
            <li>
                
            </li>
        </section>
    </>
}