"use client"
import MainCanvas from "./component/MainCanvas"
import { OverlayContent } from "./component/OverlayContent"
import { useMemo, useState } from "react"
import { ChatRoom } from "./component/chat/ChatRoomContent"

const Home = () => {
  return <>
    <main>
      <section className="absolute h-screen w-full">
        <MainCanvas/>
        <OverlayContent />
      </section>
    </main>
  </>
}

export default Home