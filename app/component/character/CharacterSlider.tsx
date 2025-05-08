import { Character } from "@/api/domain/model/Character"
import { CharacterIcon } from "./CharaAvatar"
import { useCharacterContext } from "@/app/hooks/CharacterData"

type CharacterSliderProps = {
    list: Character[],
    onCharacterSelected: (id: number) => void
}

export const CharacterSlider = ({list, onCharacterSelected}: CharacterSliderProps) => {
    const selectedCharacter = useCharacterContext()
    const characters = list.map((chara) => {
        return <CharacterIcon 
            key={chara.id} 
            model={chara} 
            selected={chara.id === selectedCharacter.charInfo.id}
            onClick={onCharacterSelected}
        />
    })

    return (
        <div className="flex w-fit">
            <ul 
                className="flex w-auto items-center overflow-x-scroll scroll-none list-blur"
                draggable={true}
            >
                {characters}
            </ul>
        </div>
    )
}