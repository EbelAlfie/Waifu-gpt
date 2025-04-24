import { CharacterRepository } from "../data/CharacterRepository";
import { mapCharacterModel } from "./Mapper";
import { CharacterModel } from "./model/Character";
import { CharacterRequest } from "./request/CharDetailRequest";

export class CharacterUseCase {
    repository: CharacterRepository = new CharacterRepository()

    async getCharacterList(): Promise<CharacterModel[]> {
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
        return this.repository.getCharacterDetail()
        .then(response => {})
        .catch(error => {
            console.log(error)
        })
    }
}