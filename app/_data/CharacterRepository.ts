import axios, { AxiosResponse } from "axios"
import { CharacterResponse } from "../../api/data/model/Character"
import { BaseResponse } from "../../api/data/model/BaseResponse"

export class CharacterRepository {
    async getCharacterList() {
        const request = JSON.stringify({
            "server": "os_asia",
            "role_id": "879370443"
          })

        const config = {
            method: "POST",
            maxBodyLength: Infinity,
            url: "https://sg-public-api.hoyolab.com/event/game_record/genshin/api/character/list",
            data: request,
            headers: {
                "x-rpc-language": "en-us",
            },
        }
        return axios.request(config)
    }
}//<BaseResponse<CharacterResponse>, AxiosResponse<BaseResponse<CharacterResponse>>>