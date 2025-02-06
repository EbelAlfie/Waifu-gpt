import { BackIcon, BackIconProps } from "@/app/common/BackIcon"

export const ChatHeader = ({...props}: BackIconProps) => {
    return <>
        <div className="w-max flex flex-row p-3 sm:block lg:hidden md:hidden">
            <BackIcon onClick={props.onClick}/>
        </div>
    </>
}