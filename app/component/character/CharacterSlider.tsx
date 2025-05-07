import { Character } from "@/api/domain/model/Character"
import { CharacterIcon, NextButton } from "./CharaAvatar"
import { DragEventHandler } from "react"
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

    const onDrag: DragEventHandler<HTMLDivElement> = (event) => {
        console.log(event)
    }

    return (
        <div className="flex w-screen">
            <NextButton onClick={() => {}}/>
            <div 
                className="flex w-auto items-center overflow-x-scroll scroll-none"
                draggable={true}
                onDrag={onDrag}
            >
                {characters}
            </div>
            <NextButton onClick={() => {}}/>
        </div>
    )
}