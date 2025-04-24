import { CharacterResponse } from "../data/model/CharacterResponse";
import { CharacterModel } from "./model/Character";

export function mapCharacterModel(res: CharacterResponse): CharacterModel {
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