
type ButtonProps = {
    classname?: string,
    label: string,
    onClick: () => void
}

export const LongButton = ({classname, label = "", onClick}: ButtonProps) => {
    return <div className={classname} onClick={onClick}>
        <p className="rounded-full bg-white bg-opacity-30 py-1 px-8 text_genshin text-center text-xl transition-colors duration-300 hover:cursor-pointer hover:bg-opacity-20">
            {label}
        </p>
    </div>
}