import { Request, Response } from "express"
import { CharacterUseCase } from "../domain/CharacterUseCase"

export async function getCharacterList(request: Request, response: Response) {
    const useCase = new CharacterUseCase()
    //token??
}

export async function getCharacterDetail(request: Request, response: Response) {
    const {
        charId
    } = request.query

    const useCase = new CharacterUseCase()

}