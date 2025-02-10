import { CharacterModel } from "../../domain/response_model/CharacterModel";
import { Nation } from "./models/ConstEnum";

export const deg = (degree: number) => Math.PI / 180 * degree 

export function provideVision(character: CharacterModel): string {
    console.log(`/assets/vision/Vision_${character.nationality}_${character.element}.webp`)
    return `/assets/vision/Vision_${character.nationality}_${character.element}.webp`
}