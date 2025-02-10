import { CharacterModel } from "@/domain/response_model/CharacterModel";
import { Elements, Nation } from "@/app/global/models/ConstEnum";
import { createContext } from "react";

export const dummyData = {
    name: "Layla",
    characterAiData: {
      characterId: "AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8"
    },
    modelPath: "/assets/models/char.fbx",
    element: Elements.Cryo,
    nationality: Nation.Sumeru,
  }
  
export const GlobalCharacterData = createContext<CharacterModel>(dummyData)