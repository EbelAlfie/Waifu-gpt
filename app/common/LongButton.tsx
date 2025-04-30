
type ButtonProps = {
    classname?: string,
    onClick: () => void
}

export const LongButton = ({classname, onClick}: ButtonProps) => {
    return <div className={classname} onClick={onClick}>
        <div className="relative rounded-full bg-white opacity-30 py-5 px-8"/>
        <p className="relative -top-1/2 text_genshin text-center">Details</p>
    </div>
}