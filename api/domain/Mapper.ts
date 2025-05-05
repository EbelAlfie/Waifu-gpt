import { CharacterDetailResponse } from "../data/model/CharacterDetailResponse";
import { CharacterResponse } from "../data/model/CharacterResponse";
import { Character } from "./model/Character";

export function mapCharacterModel(res: CharacterResponse): Character {
    return {
        id: res?.id ?? 0,
        icon: res?.icon ?? "",
        name: res.name ?? "",
        element: res.element ?? "",
        fetter: res.fetter ?? 0,
        level: res.level ?? 0,
        rarity: res.rarity ?? 0,
        activeConstellationNum: res.active_constellation_num ?? 0,
        image: res.image ?? "",
        isChosen: res.is_chosen ?? false,
        sideIcon: res.side_icon ?? "",
        weaponType: res.weapon_type ?? 0,
    }
}

export function mapCharacterDetail(res: CharacterDetailResponse) {
    const data = res.list[0]?.base ?? {}
    return 
}