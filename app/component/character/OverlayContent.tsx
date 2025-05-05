"use client"
import IconButton from "@/app/common/IconButton"
import NavBar from "@/app/component/character/NavBar"
import { useMemo, useState } from "react"
import { ChatRoomLayout } from '../chat/ChatRoomLayout'
import { useCharacterContext } from '../../hooks/CharacterData'
import { provideVision } from '@/app/global/utils'
import { Character } from "@/api/domain/model/Character"
import { CharacterAttribute } from "./CharacterAttributes"

export type OverlayProps = {
  characterList: Character[]
  onCharacterSelected: (position: number) => void
}

export const OverlayContent = ({...props}: OverlayProps) => {
    const character = useCharacterContext()
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
      <section className="absolute top-0 flex flex-row flex-nowrap h-screen w-screen">
          <div className="flex flex-col w-screen">
            <NavBar 
              className="pointer-events-auto relative top-0"
              label={`${character.element}/${character.name}`}
              logoSrc={imageSrc}
              characterList={props.characterList}
              onCharacterSelected={props.onCharacterSelected}
            />

            <CharacterAttribute classname="self-end flex-grow-0"/>
            <div className="pointer-events-auto flex flex-col mt-8 ms-8 items-end self-start h-auto">
              <IconButton 
                className="self-start"
                image={imageSrc} 
                onClick={() => { onAlarmClicked() }} 
                label="Alarm"
              />
              <IconButton 
                className="self-start"
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