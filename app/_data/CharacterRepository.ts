import axios, { AxiosResponse } from "axios"
import { CharacterResponse } from "./model/Character"
import { BaseResponse } from "./model/BaseResponse"

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
                'Content-Type': 'application/json', 
                'Cookie': 'ltmid_v2=1wfkk1cxcp_hy; ltoken_v2=v2_CAISDGM5b3FhcTNzM2d1OBokYjVmMDdiNmYtMGNhMS00MGMyLTllZTItMTBkZDBjMTFlNzRiIMyinsAGKMH2j8YFMOSF24wBQgtiYnNfb3ZlcnNlYQ.TJEHaAAAAAAB.MEQCIEhABYfRFHKot802VNLOgKQ0a7h3QpP8HbEfmJscV61pAiBR7nnbgmTzaFlC4WLxuvTOEX9nrD3D_LwGWywv41fFRw; ltuid_v2=295092964'
            },
        }
        return axios.request(config)
    }
}//<BaseResponse<CharacterResponse>, AxiosResponse<BaseResponse<CharacterResponse>>>