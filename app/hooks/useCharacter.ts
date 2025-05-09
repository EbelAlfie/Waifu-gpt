import { useEffect, useMemo, useState } from "react"
import { CharacterUseCase } from "../_domain/CharacterUseCase"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "../global/UiState"
import { Character } from "@/api/domain/model/Character"
import { CharacterDetail } from "../_domain/response_model/CharacterDetail"

type CharacterListState = Loading | Loaded<Character[]> | Failed

export const useCharacterList = (): CharacterListState => {
    const useCase = useMemo(() => { return new CharacterUseCase() }, [])

    const [myChar, setMyChar] = useState<CharacterListState>(setLoading())

    useEffect(() => {
        setMyChar(setLoading())

        const getMyCharacter = async () => {
            const characters = await useCase.getCharacterList()
            if (characters instanceof Error) {
                setMyChar(setError(characters))
                return
            }

            setMyChar(setLoaded(characters))
        }

        getMyCharacter()
    }, [useCase])

    return myChar
}

export type CharacterDetailState = Loading | Loaded<CharacterDetail> | Failed

export const useCharacterDetail = (charId: number) => {
    const useCase = useMemo(() => { return new CharacterUseCase() }, [])

    const [character, setCharacter] = useState<CharacterDetailState>(setLoading())

    useEffect(() => {
        const getMyCharacter = async () => {
            setCharacter(setLoading())
            const character = await useCase.getCharacterDetail(charId)
            if (character instanceof Error) {
                setCharacter(setError(character))
                return //TODO handle error
            }

            setCharacter(setLoaded(character))
        }

        getMyCharacter()
    }, [useCase, charId])

    return character
} 