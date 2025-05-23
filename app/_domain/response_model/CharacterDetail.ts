import { Statistic } from "./Statistic"

export type CharacterDetail = {
    baseProperties: Map<number, Statistic>,
    extraProperties: Map<number, Statistic>,
}