import Image from "next/image"

type NavProps = {
  className: string,
  label: string,
  logoSrc: string
}

const NavBar = ({...props}: NavProps) => {
  return (
    <header className={`${props.className} w-screen nav_grad bg-gradient-to-b from-gray-600 px-5 pt-2 pb-1 text-start`}>
    <nav>
      <div className="flex flex-row items-center">
        <Image 
          src = {props.logoSrc}
          alt = "Vision"
          width={100}
          height={100}
        />
        <p className="text_genshin">{props.label}</p>
      </div>
    </nav>
  </header>
  )
}

export default NavBar