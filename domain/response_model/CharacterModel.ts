import { Elements, Nation } from "../../app/global/models/ConstEnum"

export type CharacterModel = {
    name: string,
    modelPath: string,
    characterAiData: CharacterAiData,
    element: Elements,
    nationality: Nation,
}

export type CharacterAiData = {
    characterId: string
}