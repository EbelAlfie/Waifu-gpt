import { CharacterModel } from "@/global/CharacterModel";
import { Elements, Nation } from "@/global/models/ConstEnum";
import { createContext } from "react";

export const dummyData = {
    name: "Layla",
    characterAiData: {
      characterId: "BlmjOrRW8fhjbCx6iG5saWgDJtz6VtpXOcEnLZy05YE"
    },
    modelPath: "/assets/models/char.fbx",
    element: Elements.Cryo,
    nationality: Nation.Sumeru,
  }
  
export const GlobalCharacterData = createContext<CharacterModel>(dummyData)