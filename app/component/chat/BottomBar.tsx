
type BottomBarProps = {
    textFieldProp: TextFieldProps,
    onTyping: (text: string) => void
    onSendClicked: () => void
}

export const BottomBar = (props: BottomBarProps) => {
    return <>
        <div className="my-8 mx-5 flex flex-row justify-center">
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
            className="bg-yellow-100 rounded-lg"
            onClick={onClick}
        >
            <image></image>
        </button>
    </>
}