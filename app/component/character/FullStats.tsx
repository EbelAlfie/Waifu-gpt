import { CharacterDetailData } from "@/app/hooks/CharacterData"
import { useContext, useMemo } from "react"
import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { StatsCode } from "@/app/global/ConstEnum"
import { ExitIcon } from "@/app/common/BackIcon"
import { useDynamicContext } from "@/app/hooks/utils"
import { OverlayAction, OverlayActions } from "@/app/hooks/ActionContext"
import { CharacterStat } from "./Stats"

export const FullStats = ({isVisible}: {isVisible: Boolean}) => {
    const detail = useContext(CharacterDetailData) 
    const action = useDynamicContext<OverlayActions>(OverlayAction)

    const transition = useMemo(
        () => isVisible && detail.type === "loaded" ? "opacity-100 scale-100": "opacity-0 scale-0", 
        [isVisible, detail.type]
    )
    return <>
        <section className={`absolute w-full h-full p-10 rounded-xl flex flex-row gap-5 bg-gradient-to-b from-black to-transparent transition-opacity duration-100 ${transition}`}>
            <div className="flex flex-col gap-3 w-full">
                {detail.type === "loaded" && <>
                        <StatsHeader label="Base Stats"/>
                        <StatsGroup detail={detail.data}/>
                        <StatsHeader label="Advanced Stats"/>
                        <StatsGroup detail={detail.data}/>
                        <StatsHeader label="Elemental Type"/>
                    </>
                }
            </div>
            <ExitIcon className="justify-self-end" onClick={() => { action.onStatDetailClicked(false) }}/>
        </section>
    </>
}

const StatsHeader = ({label}: {label: string}) => {
    return <h1 className="font-[genshin] text-gray-500">{label}</h1>
}

const StatsGroup = ({detail}: {detail : CharacterDetail}) => {
    return <table>
        <CharacterStat
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={detail.properties?.get(StatsCode.MAX_HP)?.final ?? ""}
        />
        <CharacterStat
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={detail.properties?.get(StatsCode.MAX_HP)?.final ?? ""}
        />
    </table>
} 