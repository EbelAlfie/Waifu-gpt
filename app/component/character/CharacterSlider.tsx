import { CharacterModel } from "@/api/domain/model/Character"
import { CharacterIcon } from "./CharaAvatar"

export const CharacterSlider = ({list}: {list: CharacterModel[]}) => {
    const characters = list.map((chara) => {
        return <CharacterIcon icon={chara.sideIcon}/>
    })

    return (
        <div className="flex flex-row items-center w-screen overflow-x-scroll scroll-none">
            {characters}
        </div>
    )
}