import { Character } from "@/api/domain/model/Character"

type CharacterIconProps = {
    model: Character, 
    selected?: boolean, 
    onClick: (id: number) => void
}

export const CharacterIcon = ({model, selected = false, onClick}: CharacterIconProps) => {
    return <li className="relative shrink-0 hover:cursor-pointer" onClick={() => {onClick(model.id)}}>
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-20 bg-contain bg-center ${selected ? "item-active": "item-normal"}`}
        />
        <img 
            className="size-24 -translate-y-3"
            src={model.sideIcon}
        />
    </li>
}
