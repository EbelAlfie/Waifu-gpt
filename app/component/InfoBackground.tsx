import { DEG_90 } from "@/utils/angle"
import { color, DoubleSide } from "three/webgpu"

const InfoBackground = () => { 
    return (
        <mesh>
            <ambientLight color={0xffffff} intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            {/* <mesh >
                <sphereGeometry/>
            </mesh> */}
            <mesh 
                rotation={[-DEG_90, 0, 0]}
                receiveShadow={true}
                attach="geometry"
            >
                <planeGeometry args={[100, 100]}/>
                <meshBasicMaterial 
                    side={DoubleSide}
                    color="black"
                    attach="material"
                />
            </mesh>
        </mesh>
    )
}

export default InfoBackground