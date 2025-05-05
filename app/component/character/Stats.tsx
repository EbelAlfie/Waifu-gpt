import { useCharacterContext } from "@/app/hooks/CharacterData"

type StatsProps = { 
    icon: string,
    stats: string,
    value: string
}

export const CharacterStat = ({...props}: StatsProps) => {
    return <div className="flex flex-row items-center grow">
        <img className="size-7 me-2" src={props.icon}/>
        <p className="flex-grow text_genshin text-lg">{props.stats}</p>
        <p className="ms-4 text_genshin">{props.value}</p>
    </div>
}

export const CharacterStats = () => {
    const character = useCharacterContext()
    const characterStats = character.charStats?.properties ?? new Map()
    console.log(characterStats)
    return <div className="grid-flow-col">
            <CharacterStat
                icon="/assets/icon/ic_max_hp.png"
                stats="Max HP"
                value={characterStats?.get(2000)?.final ?? ""}
            />
            <CharacterStat
                icon="/assets/icon/ic_atk.png"
                stats="ATK"
                value={characterStats?.get(2001)?.final ?? ""}
            />
            <CharacterStat
                icon="/assets/icon/ic_def.png"
                stats="DEF"
                value={characterStats?.get(2002)?.final ?? ""}
            />
            <CharacterStat
                icon="/assets/icon/ic_def.png"
                stats="Elemental Mastery"
                value={characterStats?.get(2003)?.final ?? ""}
            />
    </div>
}