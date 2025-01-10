import "./global.css"

export const metaData = {
    title: "Genshin"
}

const MainLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="en">
        <body className="w-full h-screen">
            {children}
        </body>
    </html>
  )
}

export default MainLayout