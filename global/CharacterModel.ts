import { Elements, Nation } from "./models/ConstEnum"

export type CharacterModel = {
    name: string,
    characterAiData: CharacterAiData,
    element: Elements,
    nationality: Nation,
}

export type CharacterAiData = {
    characterId: string
}