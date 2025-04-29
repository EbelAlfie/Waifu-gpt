import { GenshinText } from "@/app/common/Label"
import { CharacterStats } from "./Stats"
import { LongButton } from "@/app/common/DetailButton"
import { useCharacterContext } from "@/app/hooks/CharacterData"

export const CharacterAttribute = () => {
    const character = useCharacterContext()
    const onDetailClicked = () => {}
    return <>
        <div className="flex flex-col w-fit">
            <GenshinText>Xiao</GenshinText>
            <div className="flex flex-row w-max">

            </div>
            <GenshinText>Level X / X</GenshinText>
            {/* <CharacterStats 
                icon=""
                stats="Max HP"
            />
            <CharacterStats 
                icon=""
                stats="ATK"
            />
            <CharacterStats 
                icon=""
                stats="DEF"
            />
            <CharacterStats 
                icon=""
                stats="Elemental Mastery"
            />
            <CharacterStats 
                icon=""
                stats="Max Stamina"
            /> */}
            <LongButton onClick={onDetailClicked}/>
        </div>
    </>
}