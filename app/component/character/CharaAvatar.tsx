import { Character } from "@/api/domain/model/Character"

type CharacterIconProps = {
    model: Character, 
    selected?: boolean, 
    onClick: (id: number) => void
}

export const CharacterIcon = ({model, selected = false, onClick}: CharacterIconProps) => {
    return <div className="relative shrink-0" onClick={() => {onClick(model.id)}}>
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-20 bg-contain bg-center ${selected ? "item-active": "item-normal"}`}
        />
        <img 
            className="size-24 -translate-y-3"
            src={model.sideIcon}
        />
    </div>
}

export const NextButton = ({onClick}: {onClick: () => void}) => {
    return <symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="gti--ys-function-control-arrowleft825222171woeho2t9v8">
            <path fill="var(--gti-color, #fff)" d="M15.246 6.712V2c-2.403 4.135-7.788 8.654-9.903 10 2.115 1.346 7.5 5.865 9.903 10v-4.712c-.64-1.121-4.134-4.711-5.288-5.288 1.154-.577 4.647-4.167 5.288-5.288Z">
            </path>
            <path fill="var(--gti-color, #fff)" d="m18.487 12-.268.23a26.127 26.127 0 0 0-2.907 2.944 26.12 26.12 0 0 0-2.907-2.943L12.137 12a14.39 14.39 0 0 0 3.175-3.175A14.391 14.391 0 0 0 18.487 12Z">
            </path>
        </symbol>
}