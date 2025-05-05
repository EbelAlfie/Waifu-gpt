import { mapCharacterDetail, mapCharacterModel } from "@/api/domain/Mapper"
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

    async getCharacterDetail(characterId: number) {
        return this.repository.getCharacterDetail(characterId)
            .then(response => {
                const data = response.data
                const character = mapCharacterDetail(data.data)
                return character
            })
            .catch(error => {
                return error
            })
    }
}