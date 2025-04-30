import { GenshinText } from "@/app/common/Label"
import { LongButton } from "@/app/common/DetailButton"
import { useCharacterContext } from "@/app/hooks/CharacterData"
import { RarityStar } from "./RarityStar"
import { CharacterStat } from "./Stats"

export const CharacterAttribute = ({classname}: {classname?: string}) => {
    const character = useCharacterContext()
    const characterInfo = character.charInfo
    const rarity = new Array(5).fill(() => <RarityStar classname="fill-white"/>)

    const onDetailClicked = () => {}
    return <>
        <div className={`flex flex-col w-fit mt-8 me-8 ${classname}`}>
            <GenshinText classname="text-white text-3xl mb-5">{characterInfo.name}</GenshinText>
            <div className="flex flex-row w-max">
                {rarity}
            </div>
            <GenshinText classname="text-white text-2xl mb-3">Level X / X</GenshinText>
            <CharacterStat
                icon="/assets/icon/ic_max_hp.png"
                stats="Max HP"
                value={1000}
            />
            <CharacterStat
                icon="/assets/icon/ic_atk.png"
                stats="ATK"
                value={1000}
            />
            <CharacterStat
                icon="/assets/icon/ic_def.png"
                stats="DEF"
                value={1000}
            />
            <CharacterStat
                icon="/assets/icon/ic_def.png"
                stats="Elemental Mastery"
                value={1000}
            />
            <LongButton onClick={onDetailClicked}/>
        </div>
    </>
}