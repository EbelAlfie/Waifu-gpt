export type CharacterListResponse = {
    list: CharacterListResponse[]
}

export type CharacterResponse = { 
    id: number,
    icon: string,
    name: string,
    element: string,
    fetter: number,
    level: number,
    rarity: number,
    active_constellation_num: number,
    image: string,
    is_chosen: string,
    side_icon: string,
    weapon_type: number,
    //weapon
}