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

export const ExitIcon = ({className, onClick}: {className: string, onClick: () => void}) => {
    return <>
    <svg width={40} height={40} className={className} onClick={onClick}>
        <defs>
            <symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="gti--ys-function-control-close01207623n6khh10krge">
                <path fill="var(--gti-color, #fff)" d="M3.5 3.7c0-.11.09-.2.2-.2h3.903a.2.2 0 0 1 .142.342l-1 .999a.2.2 0 0 0 0 .283l5.114 5.113a.2.2 0 0 0 .283 0l5.113-5.113a.2.2 0 0 0 0-.283l-1-1a.2.2 0 0 1 .142-.34H20.3a.2.2 0 0 1 .2.2v3.902a.2.2 0 0 1-.341.142l-1-1a.2.2 0 0 0-.283 0l-5.113 5.114a.2.2 0 0 0 0 .282l5.113 5.114a.2.2 0 0 0 .283 0l1-1a.2.2 0 0 1 .341.142V20.3a.2.2 0 0 1-.2.2h-3.903a.2.2 0 0 1-.141-.341l1-1a.2.2 0 0 0 0-.283l-5.114-5.113a.2.2 0 0 0-.283 0l-5.114 5.113a.2.2 0 0 0 0 .283l1 1a.2.2 0 0 1-.142.34H3.7a.2.2 0 0 1-.2-.2v-3.902a.2.2 0 0 1 .342-.141l1 .999a.2.2 0 0 0 .282 0l5.114-5.114a.2.2 0 0 0 0-.282L5.124 6.745a.2.2 0 0 0-.283 0l-1 1a.2.2 0 0 1-.34-.142V3.7Z">
                </path>
            </symbol>
        </defs>
        <use href="#gti--ys-function-control-close01207623n6khh10krge"></use>
    </svg>
    </>
}