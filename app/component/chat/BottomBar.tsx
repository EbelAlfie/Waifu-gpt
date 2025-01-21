
type BottomBarProps = {
    textFieldProp: TextFieldProps,
    onTyping: (text: string) => void
    onSendClicked: () => void
}

export const BottomBar = (props: BottomBarProps) => {
    return <>
        <div className="my-8 mx-5 flex flex-row gap-3 justify-around items-center">
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
        <input 
            className="flex-grow border-slate-500 text-slate-800 placeholder-slate-500 rounded-xl p-2 bg-yellow-100"
            type="text" 
            onChange={(event) => onTyping(event.target.value)}
            placeholder={props.placeholder}
            value={props.text}
        />
    </>
}

const SendButton = ({onClick}: { onClick :() => void }) => {
    return <>
        <button 
            className="flex flex-row items-center py-2 px-4 bg-yellow-100 rounded-xl"
            onClick={onClick}
        >
            <SendIcon />
            <p className="ms-4 bold font-[genshin]">Send</p>
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