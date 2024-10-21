import NavBar from "@/components/NavBar"

export const metaData = {
    title: "Genshin"
}

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="en">
        <body>
            <NavBar />
            <main>{children}</main>
        </body>
    </html>
  )
}

export default layout