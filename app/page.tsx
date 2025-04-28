"use client"
import { useState } from "react"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/character/OverlayContent"
import { dummyData, GlobalCharacterData } from "./hooks/CharacterData"
import { useCharacterList } from "./hooks/useCharacter"
import { Character } from "@/api/domain/model/Character"

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

  return (
    <GlobalCharacterData.Provider value={dummyData}>
      <MainCanvas/>
      <OverlayContent 
        characterList={data}
        onCharacterSelected={(id) => { }}
      />
    </GlobalCharacterData.Provider>
  )
}

export default Home