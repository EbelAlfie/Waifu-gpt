import { CharacterModel } from "@/api/domain/model/Character"
import Image from "next/image"

type NavProps = {
  className: string,
  label: string,
  logoSrc: string,
  characterList: CharacterModel[]
}

const NavBar = ({...props}: NavProps) => {
  const characters = props.characterList.map((chara) => {
    return <p>{chara.name}</p>
  })
  return (
    <header className={`${props.className} w-screen nav_grad bg-gradient-to-b from-gray-600 px-5 pt-2 pb-1 text-start`}>
    <nav className="flex flex-row justify-evenly">
      <div className="flex flex-row items-center">
        <Image 
          src = {props.logoSrc}
          alt = "Vision"
          width={100}
          height={100}
        />
        <p className="text_genshin">{props.label}</p>
      </div>
      <div className="flex flex-row">
        {characters}
      </div>
    </nav>
  </header>
  )
}

export default NavBar