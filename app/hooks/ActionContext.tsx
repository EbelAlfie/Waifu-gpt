import { createContext } from "react"

export type OverlayActions = {
    onChatClicked: (newState: Boolean) => void,
    onStatDetailClicked: (newState: Boolean) => void
}

export type CharacterActions = {
    onCharacterSelected: (id: number) => void
}

export const CharacterAction = createContext<CharacterActions|undefined>(undefined)

export const OverlayAction = createContext<OverlayActions|undefined>(undefined)