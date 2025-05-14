import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { Statistic } from "@/app/_domain/response_model/Statistic"
import { BaseStat, Stats } from "@/app/global/Stats"

type StatsProps = { 
    classname?: string,
    stats: Stats,
    value?: Statistic
}

export const CharacterStat = ({...props}: StatsProps) => {
    const icon = props.stats.icon
    return <>
        <div className={`flex flex-row ${props.classname}`}>
            <img className={`size-7 me-2 ${icon ? "block": "invisible"}`} src={`/assets/icon/${icon}`}/>
            <p className="text_genshin text-lg flex-grow">{props.stats.name}</p>
            <p className="justify-self-end w-14 text-end ms-4 text_genshin">{props.value?.final ?? ""}</p>
        </div>
    </>
}

export const CharacterStats = ({detail}: {detail: CharacterDetail}) => {
    const baseProperties = detail?.baseProperties ?? new Map()
    return <div className="flex flex-col">
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                stats={BaseStat.MAX_HP}
                value={baseProperties?.get(BaseStat.MAX_HP.code)}
            />
            <CharacterStat
                classname="py-2"
                stats={BaseStat.ATK}
                value={baseProperties?.get(BaseStat.ATK.code)}
            />
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                stats={BaseStat.DEF}
                value={baseProperties?.get(BaseStat.DEF.code)}
            />
            <CharacterStat
                classname="py-2"
                stats={BaseStat.EM}
                value={baseProperties?.get(BaseStat.EM.code)}
            />
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                stats={BaseStat.STAMINA}
                value={baseProperties?.get(BaseStat.STAMINA.code)}
            />
    </div>
}