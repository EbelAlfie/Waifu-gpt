import { Nation } from "./models/ConstEnum";

export const deg = (degree: number) => Math.PI / 180 * degree 

export function provideVision(nation: Nation): string {
    return "asseets/vision/Vision_Mondstadt_Anemo.webp"
}