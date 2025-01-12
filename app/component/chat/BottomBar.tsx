
type BottomBarProps = {
    textFieldProp: TextFieldProps,
    onTyping: (text: string) => void
    onSendClicked: () => void
}

export const BottomBar = (props: BottomBarProps) => {
    return <>
        <div className="my-8 mx-5 flex flex-row justify-around items-center">
            <TextField 
                props={props.textFieldProp}
                onTyping={props.onTyping}
            />
            <SendButton onClick={props.onSendClicked}/>
        </div>
    </>
}

export type TextFieldProps = {
    text: string,
    placeholder: string
}

const TextField = (
    {onTyping, props}: {onTyping: (text: string) => void, props: TextFieldProps}
) => {
    return <>
        <div>
            <input 
                className="border-slate-500 rounded-lg p-2 bg-yellow-100"
                type="text" 
                onChange={(event) => onTyping(event.target.value)}
                placeholder={props.placeholder}
                value={props.text}
            />
        </div>
    </>
}

const SendButton = ({onClick}: { onClick :() => void }) => {
    return <>
        <button 
            className="flex flex-row items-center py-2 px-5 bg-yellow-100 rounded-lg"
            onClick={onClick}
        >
            <SendIcon />
            <p className="ms-5 bold">Send</p>
        </button>
    </>
}

const SendIcon = () => {
    return <>
        <div className="bg-slate-800 rounded-full p-1">
            <div className="bg-transparent border-2 border-yellow-300 rounded-full size-2" />
        </div>
    </>
}