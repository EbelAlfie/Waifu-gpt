"use client"
import { useState } from "react"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/character/OverlayContent"
import { CharacterDetailData, GlobalCharacterData } from "./hooks/CharacterData"
import { useCharacterDetail, useCharacterList } from "./hooks/useCharacter"
import { Character } from "@/api/domain/model/Character"
import { Elements, Nation } from "./global/ConstEnum"
import { CharacterAction } from "./hooks/ActionContext"

const Home = () => {
  const charaList = useCharacterList()

  const loadingContent = <p>Loading</p>
  const errorContent = <p>Error</p>
  
  const mainContent = charaList.type === "loaded" &&
    <MainContent data={charaList.data}/>

  return <>
    <main>
      <section className="absolute h-screen w-full">
        {charaList.type === "loading" && loadingContent}
        {mainContent}
        {charaList.type === "error" && errorContent}
      </section>
    </main>
  </>
}

type MainContentProps = {
  data: Character[]
}
const MainContent = ({data}: MainContentProps) => {
  const [selectedChar, setSelected] = useState<number>(0)
  
  const character = useCharacterDetail(data[selectedChar].id)

  const realData = {
      name: "Layla",
      characterAiData: {
        characterId: "AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8"
      },
      modelPath: "/assets/models/char.fbx",
      element: Elements.Cryo,
      nationality: Nation.Sumeru,
      charInfo: data[selectedChar],
    }
  
  const actions = {
    onCharacterSelected :(id: number) => { 
      const index = data.findIndex(char => char.id == id ) 
      setSelected(index) 
    }
  }
    
  return (
    <GlobalCharacterData.Provider value={realData}>
      <CharacterDetailData.Provider value={character}>
        <CharacterAction.Provider value = {actions}>
          <MainCanvas/>
          <OverlayContent characterList={data}/>
        </CharacterAction.Provider>
      </CharacterDetailData.Provider> 
    </GlobalCharacterData.Provider>
  )
}

export default Home