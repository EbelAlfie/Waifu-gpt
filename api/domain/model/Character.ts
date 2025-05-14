import { Elements } from "@/app/global/ConstEnum";

export type Character = {
    id: number,
    icon: string,
    name: string,
    element: Elements,
    fetter: number,
    level: number,
    rarity: number,
    activeConstellationNum: number,
    image: string,
    isChosen: string,
    sideIcon: string,
    weaponType: number,
}