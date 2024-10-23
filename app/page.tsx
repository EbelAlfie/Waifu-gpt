import IconButton from "@/components/IconButton"
import InfoBackground from "./component/InfoBackground"

const Home = () => {
  return (
    <main className="flex flex-row">
      <section className="h-screen w-full flex flex-row flex-nowrap justify-center items-center" >
        <InfoBackground/>
        <div className="h-full flex flex-col me-8 items-start">
          <IconButton />
        </div>
      </section>
    </main>
  )
}

export default Home