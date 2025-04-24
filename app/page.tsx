"use client"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/character/OverlayContent"
import { dummyData, GlobalCharacterData } from "./hooks/CharacterData"
import { useCharacterList } from "./hooks/useCharacter"

const Home = () => {
  const data = dummyData

  const charaList = useCharacterList()

  return <>
    <main>
      <section className="absolute h-screen w-full">
        {charaList.type === "loading" && <p>Loading</p>}
        {charaList.type === "loaded" && 
          <GlobalCharacterData.Provider value={data}>
            <MainCanvas/>
            <OverlayContent characterList={charaList.data}/>
          </GlobalCharacterData.Provider>
        }
        {charaList.type === "error" && <p>Error</p>}
      </section>
    </main>
  </>
}

export default Home