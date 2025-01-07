
type BottomBarProps = {
    textFieldProp: TextFieldProps,
    onSendClicked: () => void
}

export const BottomBar = (props: BottomBarProps) => {
    return <>
        <div className="my-8 mx-5 flex flex-row justify-center">
            <TextField props={props.textFieldProp}/>
            <SendButton onClick={props.onSendClicked}/>
        </div>
    </>
}

type TextFieldProps = {
    text: string,
    placeholder: string,
    onTyping: (text: string) => void,
}

const TextField = ({props}: {props: TextFieldProps}) => {
    return <>
        <div className="border-slate-500 rounded-xl">
            <input type="text" onChange={(event) => props.onTyping(event.target.value)}>
                {props.text != null ? props.text : props.placeholder}
            </input>
        </div>
    </>
}

const SendButton = ({onClick}: { onClick :() => void }) => {
    return <>
        <button onClick={onClick}>
            <image></image>
        </button>
    </>
}