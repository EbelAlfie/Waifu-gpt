import { CharacterModel } from "@/global/CharacterModel";
import { createContext } from "react";

export const CharacterData = createContext("")

export const CharacterData2 = createContext<CharacterModel|null>(null)