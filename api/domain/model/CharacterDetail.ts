export type CharacterDetail = {
    id: string,
    name: string,
    vision: string,
    nation: string,
    additionalProps: Properties,
    friendship: number
}

type Properties = {
    maxHp: number,
    atk: number,
    def: number,
    em: number,
    maxStamina: number
}