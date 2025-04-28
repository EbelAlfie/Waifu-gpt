"use client"
import { useState } from "react"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/character/OverlayContent"
import { dummyData, GlobalCharacterData } from "./hooks/CharacterData"
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
  const realData = {
      name: "Layla",
      characterAiData: {
        characterId: "AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8"
      },
      modelPath: "/assets/models/char.fbx",
      element: Elements.Cryo,
      nationality: Nation.Sumeru,
      charInfo: data[0]
    }
    
  return (
    <GlobalCharacterData.Provider value={realData}>
      <MainCanvas/>
      <OverlayContent 
        characterList={data}
        onCharacterSelected={(id) => { }}
      />
    </GlobalCharacterData.Provider>
  )
}

export default Home