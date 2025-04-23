import { useEffect, useMemo, useState } from "react"
import { CharacterUseCase } from "../_domain/CharacterUseCase"

export const useCharacter = () => {
    const useCase = useMemo(() => { return new CharacterUseCase() }, [])

    const [myChar, setMyChar] = useState()

    useEffect(() => {
        const getMyCharacter = async () => {
            const characters = await useCase.getCharacterList()
            if (characters === Error) {
                return //TODO handle error
            }

            setMyChar(characters)
        }

        getMyCharacter()
    }, [useCase])

    console.log(myChar)
}