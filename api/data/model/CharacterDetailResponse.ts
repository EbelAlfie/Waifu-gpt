export type CharacterDetailResponse = {
    list: Array<{base: CharacterDetail}>
}

type CharacterDetail = {
    id: number,
    icon: string,
    name: string, 
    element: string,
    fetter: number,
    level: number,
    rarity: number,
    actived_constellation_num: number,
    image: string,
    is_chosen: boolean,
    side_icon: string,
    weapon_type: number,
}