import IconButton from "@/components/IconButton"
import MainCanvas from "./component/MainCanvas"
import NavBar from "@/components/NavBar"

const Home = () => {
  return (
    <main>
      <section className="absolute top-0 h-screen w-full flex-row flex">
        <MainCanvas/>
      </section>

      <section className="absolute top-0 flex flex-col flex-nowrap justify-end pointer-events-none">
        <NavBar className="pointer-events-auto"/>
        <div className="flex flex-col me-8 items-end self-end pointer-events-auto">
          <IconButton />
          <IconButton />
        </div>
      </section>
    </main>
  )
}

export default Home