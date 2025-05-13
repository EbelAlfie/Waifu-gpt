import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { BaseStats } from "@/app/global/ConstEnum"

type StatsProps = { 
    classname?: string,
    icon: string,
    stats: string,
    value: string
}

export const CharacterStat = ({...props}: StatsProps) => {
    return <>
        <div className={`flex flex-row ${props.classname}`}>
            <img className="size-7 me-2" src={props.icon}/>
            <p className="text_genshin text-lg flex-grow">{props.stats}</p>
            <p className="justify-self-end w-14 text-end ms-4 text_genshin">{props.value}</p>
        </div>
    </>
}

export const CharacterStats = ({detail}: {detail: CharacterDetail}) => {
    const baseProperties = detail?.baseProperties ?? new Map()
    return <div className="flex flex-col">
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                icon="/assets/icon/ic_max_hp.png"
                stats="Max HP"
                value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
            />
            <CharacterStat
                classname="py-2"
                icon="/assets/icon/ic_atk.png"
                stats="ATK"
                value={baseProperties?.get(BaseStats.ATK)?.final ?? ""}
            />
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                icon="/assets/icon/ic_def.png"
                stats="DEF"
                value={baseProperties?.get(BaseStats.DEF)?.final ?? ""}
            />
            <CharacterStat
                classname="py-2"
                icon="/assets/icon/ic_def.png"
                stats="Elemental Mastery"
                value={baseProperties?.get(BaseStats.EM)?.final ?? ""}
            />
            <CharacterStat
                classname="py-2 bg-gradient-to-r from-transparent via-black/15 to-transparent"
                icon="/assets/icon/ic_stamina.png"
                stats="Max Stamina"
                value={baseProperties?.get(BaseStats.STAMINA)?.final ?? ""}
            />
    </div>
}