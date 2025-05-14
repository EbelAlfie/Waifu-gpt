import { CharacterModel } from "../_domain/response_model/CharacterModel";
import { Elements, Nation } from "./ConstEnum";

export const deg = (degree: number) => Math.PI / 180 * degree 

export function provideVision(character: CharacterModel): string {
    console.log(`/assets/vision/Vision_${character.nationality}_${character.element}.webp`)
    return `/assets/vision/Vision_${character.nationality}_${character.element}.webp`
}

export function getElement(element: string): Elements {
    switch(element.toLowerCase()) {
        case Elements.Cryo.toLowerCase(): 
            return Elements.Cryo
        case Elements.Electro.toLowerCase(): 
            return Elements.Cryo
        case Elements.Pyro.toLowerCase(): 
            return Elements.Pyro
        case Elements.Hydro.toLowerCase(): 
            return Elements.Hydro
        case Elements.Dendro.toLowerCase(): 
            return Elements.Dendro
        case Elements.Geo.toLowerCase(): 
            return Elements.Geo
        case Elements.Anemo.toLowerCase(): 
            return Elements.Anemo
        default:
            return Elements.Anemo
    }
}