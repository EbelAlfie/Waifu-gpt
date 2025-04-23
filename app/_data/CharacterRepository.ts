import axios, { AxiosResponse } from "axios"
import { headers } from "next/headers"
import { CharacterResponse } from "./model/Character"
import { BaseResponse } from "./model/BaseResponse"

class CharacterRepository {
    async getCharacterList() {
        const request = {
            "server": "os_asia",
            "role_id": "879370443"
        }

        const config = {
            url: "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list",
            data: request,
            headers: {
                "x-rpc-language": "en-us"
            }
        }
        return axios.request<BaseResponse<CharacterResponse>, AxiosResponse<BaseResponse<CharacterResponse>>>(config)
    }
}