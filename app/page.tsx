import IconButton from "@/components/IconButton"
import InfoBackground from "./component/InfoBackground"

const Home = () => {
  return (
    <main>
      <section className="absolute top-0 h-screen w-full z-[-1]">
        <InfoBackground/>
      </section>

      <section className="w-full py-8 flex flex-row flex-nowrap justify-end" >
        <div className="flex flex-col me-8 items-start justify-self-end">
          <IconButton />
        </div>
      </section>
    </main>
  )
}

export default Home