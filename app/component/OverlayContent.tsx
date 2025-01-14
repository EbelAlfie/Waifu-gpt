"use client"
import vision from '#/assets/vision/Vision_Mondstadt_Anemo.webp'
import IconButton from "@/components/IconButton"
import NavBar from "@/components/NavBar"
import { useState } from "react"
import { ChatRoom } from './chat/ChatRoom'
import { CharacterData } from './chat/CharacterData'

export const OverlayContent = () => {
    const imageSrc = vision.src

    const [chatState, setChatState] = useState<Boolean>(false)

    const onAlarmClicked = () => {
        
    }

    const onChatClicked = (newState: Boolean) => {
        setChatState(newState)
    }

    return <>
      <section className="absolute top-0 flex flex-row flex-nowrap h-screen w-full pointer-events-none">
          <div className="flex flex-col w-screen">
            <NavBar className="pointer-events-auto relative top-0"/>

            <div className="pointer-events-auto flex flex-col mt-8 me-8 items-end self-end h-auto">
              <IconButton 
                image={imageSrc} 
                onClick={() => { onAlarmClicked() }} 
                label="Alarm"
              />
              <IconButton 
                image={imageSrc} 
                onClick={() => { onChatClicked(!chatState) }}
                label="Chat"  
              />
            </div>

          </div>

          <section 
            className={`${!chatState?"translate-x-0":"-translate-x-full"} absolute w-max transition-all pointer-events-auto`}
          >
            <CharacterData.Provider value="AQGwzrW9BFEBHhYt93wVih5SZmfxCH5AXAm_qQiPFj8">
              <ChatRoom isChatOpened={chatState}/>
            </CharacterData.Provider>
          </section>
  
      </section>
    </>
}