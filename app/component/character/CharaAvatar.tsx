export const CharacterIcon = ({icon}: {icon: string}) => {
    return <>
    <div className="relative shrink-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-blue-900 border-2 size-20"/>
        <img 
            className="relative size-24 -translate-y-3"
            src={icon}
        />
    </div>
    </>
}