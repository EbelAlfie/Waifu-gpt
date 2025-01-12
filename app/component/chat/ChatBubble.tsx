
type ChatBubbleProp = {
    author: string,
    message: string
}

export const ChatBubble = ({...props}: ChatBubbleProp) => {
    return <>
        <div className="shadow-md rounded-lg">
            <p>Test</p>
        </div>
    </>
}