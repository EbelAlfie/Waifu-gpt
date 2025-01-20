"use client"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/OverlayContent"
import { dummyData, GlobalCharacterData } from "./component/chat/CharacterData"

const Home = () => {
  const data = dummyData

  return <>
    <main>
      <section className="absolute h-screen w-full">
        <GlobalCharacterData.Provider value={data}>
          <MainCanvas/>
          <OverlayContent />
        </GlobalCharacterData.Provider>
      </section>
    </main>
  </>
}

export default Home