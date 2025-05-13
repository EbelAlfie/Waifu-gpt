import { CharacterDetailData } from "@/app/hooks/CharacterData"
import { useContext, useMemo } from "react"
import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { BaseStats } from "@/app/global/ConstEnum"
import { ExitIcon } from "@/app/common/BackIcon"
import { useDynamicContext } from "@/app/hooks/utils"
import { OverlayAction, OverlayActions } from "@/app/hooks/ActionContext"
import { CharacterStat } from "./Stats"

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
    const baseProperties = detail.baseProperties
    return <div className="flex flex-col px-10">
        <StatsHeader label="Base Stats"/>
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_atk.png"
            stats="Atk"
            value={baseProperties?.get(BaseStats.ATK)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_def.png"
            stats="Def"
            value={baseProperties?.get(BaseStats.DEF)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_em.png"
            stats="Elemental Mastery"
            value={baseProperties?.get(BaseStats.EM)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_stamina.png"
            stats="Max Stamina"
            value={baseProperties?.get(BaseStats.STAMINA)?.final ?? ""}
        />
        <StatsHeader label="Advanced Stats"/>
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
        />
        <StatsHeader label="Elemental Type"/>
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
        />
        <CharacterStat
            classname="py-3"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={baseProperties?.get(BaseStats.MAX_HP)?.final ?? ""}
        />
    </div>
} 