import { mapCharacterModel } from "@/api/domain/Mapper"
import { CharacterRepository } from "../_data/CharacterRepository"

export class CharacterUseCase {
    repository = new CharacterRepository()
    async getCharacterList() {
        return this.repository.getCharacterList()
            .then(response => {
                const data = response.data
                const chara = data?.data?.list?.map((item) => mapCharacterModel(item)) ?? []
                return chara
            })
            .catch(error => {
                return error
            })
    }
}