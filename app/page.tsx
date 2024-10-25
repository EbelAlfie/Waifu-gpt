import IconButton from "@/components/IconButton"
import MainCanvas from "./component/MainCanvas"

const Home = () => {
  return (
    <main>
      <section className="absolute top-0 h-screen w-full flex-row flex">
        <MainCanvas/>
      </section>

      <section className="py-8 flex flex-row flex-nowrap justify-end" >
        <div className="flex flex-col me-8 items-start justify-self-end">
          <IconButton />
        </div>
      </section>
    </main>
  )
}

export default Home