import Image from "next/image"
import vision from "@/assets/vision/Vision_Sumeru_Cryo.webp"
import { Elements, Nation } from "@/models/ConstEnum"

const NavProps = {
  charName: String,
  element: Elements,
  nationality: Nation
}

const NavBar = ({className}: {className: string}) => {
  return (
    <header className={`${className} w-screen nav_grad bg-gradient-to-b from-gray-600 px-5 pt-2 pb-1 text-start`}>
    <nav>
      <div className="flex flex-row items-center">
        <Image 
          src = {vision}
          alt = "Vision"
          width={100}
          height={100}
        />
        <p className="text_genshin">Cryo/ Layla</p>
      </div>
    </nav>
  </header>
  )
}

export default NavBar