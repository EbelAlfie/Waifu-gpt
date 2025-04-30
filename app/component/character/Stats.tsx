import { useCharacterContext } from "@/app/hooks/CharacterData"

type StatsProps = { 
    icon: string,
    stats: string,
    value: number
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
    return <div className="grid-flow-col">
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
    </div>
}