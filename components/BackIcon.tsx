export type BackIconProps = {
    onClick: () => void
}

export const BackIcon = ({...props}: BackIconProps) => {
    return <>
        <button 
            className="w-fit h-fit px-1 py-1.5 bg-[#ede5d7] hover:bg-[#ede5d7] border-4 border-[#858486] rounded-full"
            onClick={props.onClick}    
        >
            <img src="/assets/icon/back_arrow.svg" alt="back"/>
        </button>
    </>
}