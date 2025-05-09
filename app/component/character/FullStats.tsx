import { CharacterDetailData } from "@/app/hooks/CharacterData"
import { CharacterStat } from "./Stats"
import { useContext, useMemo } from "react"
import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail"
import { StatsCode } from "@/app/global/ConstEnum"

export const FullStats = () => {
    const detail = useContext(CharacterDetailData) 

    const transition = useMemo(
        () => detail.type === "loaded" ? "opacity-100 scale-100": "opacity-0 scale-0", [detail.type]
    )
    return <>
        <section className={`w-screen h-screen flex flex-col bg-black bg-gradient-to-b from-black to to-transparent ${transition}`}>
            {detail.type === "loaded" && <>
                    <StatsHeader label="Base Stats"/>
                    <StatsGroup detail={detail.data}/>
                    <StatsHeader label="Advanced Stats"/>
                    <StatsGroup detail={detail.data}/>
                    <StatsHeader label="Elemental Type"/>
                </>
            }
        </section>
    </>
}

const StatsHeader = ({label}: {label: string}) => {
    return <h3>{label}</h3>
}

const StatsGroup = ({detail}: {detail : CharacterDetail}) => {
    return <div className="grid - grid-cols-[0.5fr_10fr_1fr_1fr_1fr">
        <CharacterStat
            classname="bg-gradient-to-r from-transparent via-black/15 to-transparent py-1"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={detail.properties?.get(StatsCode.MAX_HP)?.final ?? ""}
        />
        <CharacterStat
            classname="bg-gradient-to-r from-transparent via-black/15 to-transparent py-1"
            icon="/assets/icon/ic_max_hp.png"
            stats="Max HP"
            value={detail.properties?.get(StatsCode.MAX_HP)?.final ?? ""}
        />
    </div>
} 