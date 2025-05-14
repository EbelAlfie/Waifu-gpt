import { createContext } from "react"
import { Elements } from "../global/ConstEnum"

export type ThemeType = {
    mistColor: number,
    skyColor: number,
    floorColor: number
}

const CryoTheme: ThemeType = {
    mistColor: 0x1f5f85,
    skyColor: 0x10334b,
    floorColor: 0x133e5d
}

const PyroTheme: ThemeType = {
    mistColor: 0x64221f,
    skyColor: 0x64221f,
    floorColor: 0x3e1110
}

const ElectroTheme: ThemeType = {
    mistColor: 0x4a259b,
    skyColor: 0x231157,
    floorColor: 0x2e176a
}

const HydroTheme: ThemeType = {
    mistColor: 0x2856a8,
    skyColor: 0x171f41,
    floorColor: 0x213f80
}

const AnemoTheme: ThemeType = {
    mistColor: 0x165c54,
    skyColor: 0x081e1d,
    floorColor: 0x0e3835
}

const GeoTheme: ThemeType = {
    mistColor: 0x7e672f,
    skyColor: 0x322711,
    floorColor: 0x594522
}

const DendroTheme: ThemeType = {
    mistColor: 0x385021,
    skyColor: 0x1e3106,
    floorColor: 0x28400f
}

export const Theme = createContext<ThemeType>(CryoTheme)

export const getTheme = (element: string): ThemeType => {
    switch(element.toLowerCase()) {
        case Elements.Cryo.toLowerCase(): 
            return CryoTheme
        case Elements.Electro.toLowerCase(): 
            return ElectroTheme
        case Elements.Pyro.toLowerCase(): 
            return PyroTheme
        case Elements.Hydro.toLowerCase(): 
            return HydroTheme
        case Elements.Dendro.toLowerCase(): 
            return DendroTheme
        case Elements.Geo.toLowerCase(): 
            return GeoTheme
        case Elements.Anemo.toLowerCase(): 
            return AnemoTheme
        default:
            return AnemoTheme
    }
}