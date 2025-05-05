export type CharacterDetail = {
    id: string,
    name: string,
    vision: string,
    nation: string,
    additionalProps: Array<Properties>,
    friendship: number
}

export type Properties = {
    property_type: number,
    base: string,
    add: string,
    final: string
}