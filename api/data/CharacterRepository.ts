import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "./model/BaseResponse";
import { CharacterListResponse } from "./model/CharacterResponse";
import { CharacterDetailResponse } from "./model/CharacterDetailResponse";

export class CharacterRepository {
    cookie = process.env.HOYO_COOKIE ?? ""

    async getCharacterList() {
        const request = {
            "server": "os_asia",
            "role_id": "879370443"
        }
        const config = {
            method: "POST",
            maxBodyLength: Infinity,
            url: "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list",
            data: request,
            headers: {
                "x-rpc-language": "en-us",
                "cookie": this.cookie
            },
        }
        return axios.request<BaseResponse<CharacterListResponse>, AxiosResponse<BaseResponse<CharacterListResponse>>>(config)
    }

    async getCharacterDetail(characterId: number[]) {
        const request = {
            "server": "os_asia",
            "role_id": "879370443",
            "character_ids": characterId
        }
        const config = {
            method: "POST",
            url: "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/detail",
            maxBodyLength : Infinity,
            data: request,
            headers: {
                "x-rpc-language": "en-us",
                "cookie": this.cookie
            },
        }
        return axios.request<BaseResponse<CharacterDetailResponse>>(config)
    }
}