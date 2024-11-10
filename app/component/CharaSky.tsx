import { EnvironmentCube } from "@react-three/drei"
import { ReactNode } from "react"
import { BackSide, ColorRepresentation, DoubleSide, Spherical } from "three"

type SkyProps = {
    color?: ColorRepresentation
}

const CharaSky = ({color = 0xffffff, ...props}: SkyProps) => {
    return (
        <>
            <mesh
                scale={100}
            >
                <sphereGeometry args={[1.5]} />
                <meshBasicMaterial 
                    side={BackSide}
                    color={color}
                    fog={false}
                />
            </mesh>
        </>
    )
}

export default CharaSky