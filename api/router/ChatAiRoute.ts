import { Request, Response } from "express"
import { getCharacterDetail, getCharacterList } from "../controller/CharacterController"

type RouteModel = { 
    name: string,
    controller: (request: Request, response: Response) => void
}

export const CharacterList: RouteModel = {
    name: "/characters",
    controller: getCharacterList
}

export const CharacterDetail: RouteModel = {
    name: "/character",
    controller: getCharacterDetail
}