import { CharacterDetailData } from "@/app/hooks/CharacterData"
import { useContext, useMemo } from "react"
import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { ExitIcon } from "@/app/common/BackIcon"
import { useDynamicContext } from "@/app/hooks/utils"
import { OverlayAction, OverlayActions } from "@/app/hooks/ActionContext"
import { CharacterStat } from "./Stats"
import { AdvancedStat, BaseStat } from "@/app/global/Stats"

export const FullStats = ({isVisible}: {isVisible: Boolean}) => {
    const detail = useContext(CharacterDetailData) 
    const action = useDynamicContext<OverlayActions>(OverlayAction)

    const transition = useMemo(
        () => isVisible && detail.type === "loaded" ? "block": "hidden",
        [isVisible, detail.type]
    )
    return <>
        <section className={`absolute w-full h-full p-10 rounded-xl flex flex-row gap-5 bg-gradient-to-b pointer-events-auto from-black via-black to-transparent transition-all duration-700 ${transition}`}>
            <div className="flex flex-col gap-3 w-full">
                {detail.type === "loaded" && <StatsGroup detail={detail.data}/>}
            </div>
            <ExitIcon className="self-start" onClick={() => { action.onStatDetailClicked(false) }}/>
        </section>
    </>
}

const StatsHeader = ({label, className}: {label: string, className?: string}) => {
    return <tr>
        <td className={className} colSpan={4}>
            <h1 className="font-[genshin] text-gray-500">{label}</h1>
        </td>
    </tr>
}

const StatsGroup = ({detail}: {detail : CharacterDetail}) => {
    const { 
        baseProperties,
        extraProperties
    } = detail

    return <div className="flex flex-col px-10">
        <StatsHeader label="Base Stats"/>
        <CharacterStat
            classname="py-3"
            stats={BaseStat.MAX_HP}
            value={baseProperties?.get(BaseStat.MAX_HP.code)}
        />
        <CharacterStat
            classname="py-3 bg-gradient-to-r from-transparent via-black/10 to-transparent"
            stats={BaseStat.ATK}
            value={baseProperties?.get(BaseStat.ATK.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={BaseStat.DEF}
            value={baseProperties?.get(BaseStat.DEF.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={BaseStat.EM}
            value={baseProperties?.get(BaseStat.EM.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={BaseStat.STAMINA}
            value={baseProperties?.get(BaseStat.STAMINA.code)}
        />
        <StatsHeader label="Advanced Stats"/>
        <CharacterStat
            classname="py-3"
            stats={AdvancedStat.CRIT_RATE}
            value={extraProperties?.get(AdvancedStat.CRIT_RATE.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={AdvancedStat.CRIT_DMG}
            value={extraProperties?.get(AdvancedStat.CRIT_DMG.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={AdvancedStat.HEAL}
            value={extraProperties?.get(AdvancedStat.HEAL.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={AdvancedStat.INCOMING_HEAL}
            value={extraProperties?.get(AdvancedStat.INCOMING_HEAL.code)}
        />
        <CharacterStat
            classname="py-3"
            stats={AdvancedStat.ER}
            value={extraProperties?.get(AdvancedStat.ER.code)}
        />
    </div>
} 