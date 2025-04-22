import { CharacterRepository } from "../data/CharacterRepository";
import { CharacterRequest } from "./request/CharDetailRequest";

export class CharacterUseCase {
    repository: CharacterRepository = new CharacterRepository()

    async getCharacterList() {
        return this.repository.getCharacterList()
        .then(response => {})
        .catch(error => {
            console.log(error)
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