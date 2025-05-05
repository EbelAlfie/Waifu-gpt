import { CharacterListResponse } from "../../api/data/model/CharacterResponse"
import { BaseResponse } from "../../api/data/model/BaseResponse"
import axios from "axios"
import { CharacterDetailResponse } from "@/api/data/model/CharacterDetailResponse"

export class CharacterRepository {
    async getCharacterList() {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: "http://localhost:4000/characters",
            headers: { 
                "accept": "application/json"
            }
        }
        return axios.request<BaseResponse<CharacterListResponse>>(config)
    }

    async getCharacterDetail(characterId: number) {
        const config = {
            method: "GET",
            maxBodyLength: Infinity,
            url: "http://localhost:4000/character",
            headers: { 
                "accept": "application/json"
            }
        }
        return axios.request<BaseResponse<CharacterDetailResponse>>(config)
    }
}