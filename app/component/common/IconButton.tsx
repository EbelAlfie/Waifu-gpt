import Image from "next/image"

type IconButtonProps = {
    image: string,
    label: string,
    onClick: () => void
}

const IconButton = ({...props}: IconButtonProps) => {
    return (
        <div className="flex flex-col items-center">
            <button className='icon_button' onClick={props.onClick}>
            <Image
                src={props.image}
                alt="button"
                width={50}
                height={50}
            />
            </button>
            <p className="text_genshin">{props.label}</p>
        </div>
    )
}

export default IconButton