"use client"
import IconButton from "@/app/common/IconButton"
import NavBar from "@/app/common/NavBar"
import { useContext, useMemo, useState } from "react"
import { ChatRoomLayout } from './chat/ChatRoomLayout'
import { GlobalCharacterData } from '../hooks/CharacterData'
import { provideVision } from '@/app/global/utils'

export const OverlayContent = () => {
    const character = useContext(GlobalCharacterData)
    const imageSrc = useMemo(() => provideVision(character), [character])

    const [isChatVisible, setChatVisibility] = useState<Boolean>(false)

    const onAlarmClicked = () => {
        if (!(window as any)?.MobileGateBox?.setAlarm) return 

        (window as any).MobileGateBox.setAlarm(true)
    }

    const onChatClicked = (newState: Boolean) => {
      setChatVisibility(newState)
    }

    return <>
      <section className="absolute top-0 flex flex-row flex-nowrap h-screen w-screen pointer-events-none">
          <div className="flex flex-col w-screen">
            <NavBar 
              className="pointer-events-auto relative top-0"
              label={`${character.element}/${character.name}`}
              logoSrc={imageSrc}
            />

            <div className="pointer-events-auto flex flex-col mt-8 me-8 items-end self-end h-auto">
              <IconButton 
                image={imageSrc} 
                onClick={() => { onAlarmClicked() }} 
                label="Alarm"
              />
              <IconButton 
                image={imageSrc} 
                onClick={() => { onChatClicked(!isChatVisible) }}
                label="Chat"  
              />
            </div>

          </div>

          <section 
            className={`${isChatVisible?"translate-x-0":"-translate-x-full"} absolute w-max transition-all pointer-events-auto`}
          >
            <ChatRoomLayout 
              isChatOpened={isChatVisible}
              onBackPressed={onChatClicked}
            />
          </section>
  
      </section>
    </>
}