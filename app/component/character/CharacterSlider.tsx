import { CharacterModel } from "@/api/domain/model/Character"
import { CharacterIcon } from "./CharaAvatar"

export const CharacterSlider = ({list}: {list: CharacterModel[]}) => {
    const characters = list.map((chara) => {
        return <CharacterIcon key={chara.id} icon={chara.sideIcon}/>
    })

    return (
        <div className="flex items-center w-screen overflow-x-scroll scroll-none">
            {characters}
        </div>
    )
}