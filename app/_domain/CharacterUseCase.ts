import { CharacterRepository } from "@/api/data/CharacterRepository";

export class CharacterUseCase {
    repository = new CharacterRepository()
    async getCharacterList() {
        return this.repository.getCharacterList()
            .then(response => {
                console.log(response)
                return response
            })
            .catch(error => {
                return error
            })
    }
}