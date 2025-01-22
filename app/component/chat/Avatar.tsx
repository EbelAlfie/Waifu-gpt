type AvatarProps = { 
    url : string,
    className?: string
}

export const Avatar = ({...props}: AvatarProps) => {
    return <img 
            className={`${props.className} border-2 border-border_icon rounded-full size-10`}
            src={props.url} 
        />
}