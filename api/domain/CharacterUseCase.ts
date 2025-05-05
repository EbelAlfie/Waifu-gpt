import { Character } from "./model/Character";
import { CharacterRepository } from "../data/CharacterRepository";
import { CharacterRequest } from "./request/CharDetailRequest";

export class CharacterUseCase {
    repository: CharacterRepository = new CharacterRepository()

    async getCharacterList(): Promise<Character[]> {
        return this.repository.getCharacterList()
        .then(response => {
            const data = response.data
            return data
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }

    async getCharacterDetail(request: CharacterRequest) {
        return this.repository.getCharacterDetail([request.id])
        .then(response => {
            const data = response.data
            return data
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }
}