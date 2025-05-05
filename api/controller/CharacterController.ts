import { Request, Response } from "express"
import { CharacterUseCase } from "../domain/CharacterUseCase"

export async function getCharacterList(request: Request, response: Response) {
    const useCase = new CharacterUseCase()
    const characters = await useCase.getCharacterList()
    
    if (characters instanceof Error) {
        response.status(500).json({ error : characters.cause ?? "Internal Error"})
        return 
    }

    console.log(characters)
    //token??
    response.status(200).json(characters)
}

export async function getCharacterDetail(request: Request, response: Response) {
    const {
        charId = ""
    } = request.query

    const useCase = new CharacterUseCase()

    const characterDetail = useCase.getCharacterDetail({
        id: Number.parseInt(charId.toString())
    })
    
    if (characterDetail instanceof Error) {
        response.status(500).json({ error : characterDetail.cause ?? "Internal Error" })
        return
    }

    //token??
    response.status(200).json(characterDetail)
}