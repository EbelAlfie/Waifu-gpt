export type BackIconProps = {
    onClick: () => void
}

export const BackIcon = ({...props}: BackIconProps) => {
    return <>
        <button 
            className="w-fit h-fit px-1 py-1.5 bg-back_light hover:bg-back_hovered border-4 border-border_icon rounded-full"
            onClick={props.onClick}    
        >
            <img src="/assets/icon/back_arrow.svg" alt="back"/>
        </button>
    </>
}