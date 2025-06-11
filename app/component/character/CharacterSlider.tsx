import { Character } from "@/api/domain/model/Character"
import { CharacterIcon } from "./CharaAvatar"
import { useCharacterContext } from "@/app/hooks/CharacterData"
import { useDynamicContext } from "@/app/hooks/utils"
import { CharacterAction, CharacterActions } from "@/app/hooks/ActionContext"
import { useTransition } from "react"

type CharacterSliderProps = {
    list: Character[],
}

export const CharacterSlider = ({list}: CharacterSliderProps) => {
    const [_, startTransition] = useTransition()
    const selectCharacterAction = useDynamicContext<CharacterActions>(CharacterAction)
    const selectedCharacter = useCharacterContext()
    const characters = list.map((chara) => {
        return <CharacterIcon 
            key={chara.id} 
            model={chara} 
            selected={chara.id === selectedCharacter.charInfo.id}
            onClick={() => startTransition(() => { selectCharacterAction?.onCharacterSelected(chara.id) })}
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