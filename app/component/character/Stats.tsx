import { StatsCode } from "@/app/global/ConstEnum"
import { useCharacterContext } from "@/app/hooks/CharacterData"

type StatsProps = { 
    classname?: string,
    icon: string,
    stats: string,
    value: string
}

export const CharacterStat = ({...props}: StatsProps) => {
    return <div className={`grid grid-cols-[0.5fr_2fr_0.5fr] items-center ${props.classname}`}>
        <img className="size-7 me-2" src={props.icon}/>
        <p className="text_genshin text-lg">{props.stats}</p>
        <p className="justify-self-end ms-4 text_genshin">{props.value}</p>
    </div>
}

export const CharacterStats = () => {
    const character = useCharacterContext()
    const characterStats = character.charStats?.properties ?? new Map()
    return <div className="flex flex-col gap-2">
            <CharacterStat
                classname="bg-gradient-to-r from-transparent via-black/15 to-transparent py-1"
                icon="/assets/icon/ic_max_hp.png"
                stats="Max HP"
                value={characterStats?.get(StatsCode.MAX_HP)?.final ?? ""}
            />
            <CharacterStat
                icon="/assets/icon/ic_atk.png"
                stats="ATK"
                value={characterStats?.get(StatsCode.ATK)?.final ?? ""}
            />
            <CharacterStat
                classname="bg-gradient-to-r from-transparent via-black/15 to-transparent py-1"
                icon="/assets/icon/ic_def.png"
                stats="DEF"
                value={characterStats?.get(StatsCode.DEF)?.final ?? ""}
            />
            <CharacterStat
                icon="/assets/icon/ic_def.png"
                stats="Elemental Mastery"
                value={characterStats?.get(StatsCode.EM)?.final ?? ""}
            />
    </div>
}