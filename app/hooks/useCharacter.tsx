import { useEffect, useMemo, useState } from "react"
import { CharacterUseCase } from "../_domain/CharacterUseCase"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "../global/UiState"
import { CharacterModel } from "@/api/domain/model/Character"

type CharacterListState = Loading | Loaded<CharacterModel[]> | Failed

export const useCharacterList = (): CharacterListState => {
    const useCase = useMemo(() => { return new CharacterUseCase() }, [])

    const [myChar, setMyChar] = useState<CharacterListState>(setLoading())

    useEffect(() => {
        setMyChar(setLoading())

        const getMyCharacter = async () => {
            const characters = await useCase.getCharacterList()
            console.log(characters)
            if (characters instanceof Error) {
                setMyChar(setError(characters))
                return //TODO handle error
            }

            setMyChar(setLoaded(characters))
        }

        getMyCharacter()
    }, [useCase])

    console.log(myChar)

    return myChar
}