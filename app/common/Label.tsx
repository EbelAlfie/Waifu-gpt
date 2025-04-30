import React from "react"

type TextProps = {
    classname?: string,
    children?: React.ReactNode
}

export const GenshinText = ({...props}: TextProps) => {
    return <p className={`font-[Genshin] ${props.classname}`}>{props.children}</p>
}