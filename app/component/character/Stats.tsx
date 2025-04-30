import { GenshinText } from "@/app/common/Label"

type StatsProps = { 
    icon: string,
    stats: string,
    value: number
}

export const CharacterStat = ({...props}: StatsProps) => {
    return <div className="flex flex-row items-center grow">
        <img className="size-7 me-2" src={props.icon}/>
        <GenshinText classname="flex-grow text-white text-lg">{props.stats}</GenshinText>
        <GenshinText classname="ms-4 text-white">{props.value}</GenshinText>
    </div>
}

export const CharacterStats = () => {
    return <div className="flex flex-grid">
        
    </div>
}