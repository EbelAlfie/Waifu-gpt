import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "./model/BaseResponse";
import { CharacterListResponse } from "./model/CharacterResponse";

export class CharacterRepository {
    async getCharacterList() {
        const request = {
            "server": "os_asia",
            "role_id": "879370443"
        }
        const cookie = process.env.HOYO_COOKIE ?? ""

        const config = {
            method: "POST",
            maxBodyLength: Infinity,
            url: "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list",
            data: request,
            headers: {
                "x-rpc-language": "en-us",
                "cookie": cookie
            },
        }
        return axios.request<BaseResponse<CharacterListResponse>, AxiosResponse<BaseResponse<CharacterListResponse>>>(config)
    }

    async getCharacterDetail() {
        
    }
}