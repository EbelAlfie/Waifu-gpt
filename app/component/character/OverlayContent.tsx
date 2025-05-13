"use client"
import IconButton from "@/app/common/IconButton"
import NavBar from "@/app/component/character/NavBar"
import { useMemo, useState } from "react"
import { ChatRoomLayout } from '../chat/ChatRoomLayout'
import { useCharacterContext } from '../../hooks/CharacterData'
import { provideVision } from '@/app/global/utils'
import { Character } from "@/api/domain/model/Character"
import { CharacterAttribute } from "./CharacterAttributes"
import { FullStats } from "./FullStats"
import { OverlayAction } from "@/app/hooks/ActionContext"

export type OverlayProps = {
  characterList: Character[]
}

export const OverlayContent = ({...props}: OverlayProps) => {
    const character = useCharacterContext()
    const charInfo = character.charInfo
    const imageSrc = useMemo(() => provideVision(character), [character])

    const [isChatVisible, setChatVisibility] = useState<Boolean>(false)
    const [isStatVisible, setStatVisible] = useState<Boolean>(false)

    const onAlarmClicked = () => {
        if (!(window as any)?.MobileGateBox?.setAlarm) return 

        (window as any).MobileGateBox.setAlarm(true)
    }

    const actions = useMemo(() => {
      return {
        onChatClicked: (newState: Boolean) => {
          setChatVisibility(newState)
        },
  
        onStatDetailClicked: (newState: Boolean) => {
          setStatVisible(!isStatVisible)
        }
      }
    }, [setChatVisibility, setStatVisible])

    return <>
      <OverlayAction.Provider value={actions}>
        <section className="absolute top-0 flex flex-row flex-nowrap h-screen w-screen pointer-events-none">
            <div className="flex flex-col w-full pointer-events-none overflow-hidden">
              <NavBar 
                className="pointer-events-auto relative top-0"
                label={`${charInfo.element}/${charInfo.name}`}
                logoSrc={imageSrc}
                characterList={props.characterList}
              />

              <div className="relative flex">
                <CharacterAttribute classname="pointer-events-auto absolute top-0 right-0 self-end flex-grow-0"/>
                <div className="pointer-events-auto absolute left-0 flex flex-col mt-8 ms-8 items-end self-start h-auto">
                  <IconButton 
                    className="self-start"
                    image={imageSrc} 
                    onClick={() => { onAlarmClicked() }} 
                    label="Alarm"
                  />
                  <IconButton 
                    className="self-start"
                    image={imageSrc} 
                    onClick={() => { actions.onChatClicked(!isChatVisible) }}
                    label="Chat"  
                  />
                </div>
              </div>
              
            </div>

            <section 
              className={`${isChatVisible?"translate-x-0":"-translate-x-full"} absolute w-max transition-transform pointer-events-auto`}
            >
              <ChatRoomLayout 
                isChatOpened={isChatVisible}
                onBackPressed={actions.onChatClicked}
              />
            </section>

            
            <FullStats isVisible={isStatVisible}/>
    
        </section>
      </OverlayAction.Provider>
    </>
}