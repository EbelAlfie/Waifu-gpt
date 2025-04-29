import { GenshinText } from "@/app/common/Label"

type StatsProps = { 
    icon: string,
    stats: string,
    value: number
}

export const CharacterStats = ({...props}: StatsProps) => {
    return <div className="flex flex-row">
        <img src={props.icon}/>
        <GenshinText classname="flex-grow">{props.stats}</GenshinText>
        <GenshinText>{props.value}</GenshinText>
    </div>
}