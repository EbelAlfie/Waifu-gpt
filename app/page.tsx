"use client"
import { useState } from "react"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/character/OverlayContent"
import { CharacterAction, dummyData, GlobalCharacterData } from "./hooks/CharacterData"
import { useCharacterList } from "./hooks/useCharacter"
import { Character } from "@/api/domain/model/Character"
import { info } from "console"
import { Elements, Nation } from "./global/ConstEnum"

const Home = () => {
  const charaList = useCharacterList()

  const [selectedChar, setChar] = useState<number>(0)

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
  const [selectedChar, setSelected] = useState(0)

  const realData = {
      name: "Layla",
      characterAiData: {
        characterId: "AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8"
      },
      modelPath: "/assets/models/char.fbx",
      element: Elements.Cryo,
      nationality: Nation.Sumeru,
      charInfo: data[selectedChar]
    }
  
  const onSelected = (id: number) => { 
    const index = data.findIndex(char => char.id == id ) 
    setSelected(index) 
  }
    
  return (
    <GlobalCharacterData.Provider value={realData}>
      <CharacterAction.Provider value = {onSelected}>
        <MainCanvas/>
        <OverlayContent 
          characterList={data}
          onCharacterSelected={onSelected}
        />
      </CharacterAction.Provider>
    </GlobalCharacterData.Provider>
  )
}

export default Home