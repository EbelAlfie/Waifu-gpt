import { CharacterModel } from "@/app/_domain/response_model/CharacterModel";
import { Elements, Nation } from "@/app/global/ConstEnum";
import { createContext, useContext } from "react";

export const dummyData = {
    name: "Layla",
    characterAiData: {
      characterId: "AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8"
    },
    modelPath: "/assets/models/char.fbx",
    element: Elements.Cryo,
    nationality: Nation.Sumeru,
  }
  
export const GlobalCharacterData = createContext<CharacterModel| undefined>(undefined)

export const useCharacterContext = () : CharacterModel => {
  const character = useContext(GlobalCharacterData) 
  return character as CharacterModel
}