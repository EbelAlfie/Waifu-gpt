import "./global.css"
import NavBar from "@/components/NavBar"

export const metaData = {
    title: "Genshin"
}

const MainLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="en">
        <body className="w-full h-screen">
            <NavBar />
            {children}
        </body>
    </html>
  )
}

export default MainLayout