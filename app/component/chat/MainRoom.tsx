import { BottomBar } from "./BottomBar"

export const MainRoom = () => {
    return <>
        <section className="flex flex-col before:none after:animate-bounce">
            <ChatList />
            {/* <BottomBar /> */}
        </section>
    </>
}

const ChatList = () => {
    return <>
        <li>

        </li>
    </>
}