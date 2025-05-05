import { Statistic } from "@/app/_domain/response_model/Statistic";
import { CharacterDetailResponse, CharacterProperties } from "../data/model/CharacterDetailResponse";
import { CharacterResponse } from "../data/model/CharacterResponse";
import { Character } from "./model/Character";
import { CharacterDetail } from "@/app/_domain/response_model/CharacterDetail";

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

export function mapCharacterDetail(res: CharacterDetailResponse): CharacterDetail {
    const data = res.list[0] ?? {}
    const charStats = new Map(
        data.selected_properties.map(item => [item.property_type, mapCharacterStats(item)])
    ) 
    return {
        properties: charStats
    }
}

function mapCharacterStats(props: CharacterProperties): Statistic {
    return {
        propertyType: props.property_type,
        base: props.base,
        add: props.add,
        final: props.final
    }
}