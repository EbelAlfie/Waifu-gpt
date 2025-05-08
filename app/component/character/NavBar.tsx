import { Character } from "@/api/domain/model/Character"
import Image from "next/image"
import { CharacterSlider } from "./CharacterSlider"

type NavProps = {
  className: string,
  label: string,
  logoSrc: string,
  characterList: Character[],
  onCharacterSelected: (id: number) => void
}

const NavBar = ({...props}: NavProps) => {
  return (
    <header className={`${props.className} w-screen nav_grad bg-gradient-to-b from-gray-600 px-5 pt-2 pb-1 text-start`}>
    <nav className="w-full grid grid-cols-[1fr_4fr_1fr] items-center">
      <div className="flex flex-row items-center me-16">
        <Image 
          src = {props.logoSrc}
          alt = "Vision"
          width={100}
          height={100}
        />
        <p className="text_genshin">{props.label}</p>
      </div>

      <CharacterSlider 
        list={props.characterList} 
        onCharacterSelected={props.onCharacterSelected}
      />
    </nav>
  </header>
  )
}

export default NavBar