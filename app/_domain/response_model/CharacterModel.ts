import { Character } from "@/api/domain/model/Character"
import { Elements, Nation } from "../../global/ConstEnum"

export type CharacterModel = {
    name: string,
    modelPath: string,
    characterAiData: CharacterAiData,
    element: Elements,
    nationality: Nation,
    charInfo: Character
}

export type CharacterAiData = {
    characterId: string
}