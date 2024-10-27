import { EnvironmentCube } from "@react-three/drei"
import { ReactNode } from "react"

const CharaSky = ({children}: {children : ReactNode}) => {
    return (
        <>
            <mesh
                scale={100}
            >
                <boxGeometry />
                {children}
            </mesh>
        </>
    )
}

export default CharaSky