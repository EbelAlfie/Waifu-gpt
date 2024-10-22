import Image from "next/image"
import vision from "@/assets/vision/Vision_Sumeru_Cryo.webp"
import { Elements, Nationality } from "@/models/ConstEnum"

const NavProps = {
  charName: String,
  element: Elements,
  nationality: Nationality
}

const NavBar = () => {
  return (
    <header className="nav_grad bg-gradient-to-b from-gray-600 px-5 py-2 text-start">
    <nav>
      <div className="flex flex-row items-center">
        <Image 
          src = {vision}
          alt = "Vision"
          width={100}
          height={100}
        />
        <p className="font-[Genshin] text-white">Cryo/ Layla</p>
      </div>
    </nav>
  </header>
  )
}

export default NavBar