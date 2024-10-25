import { deg } from "@/utils/angle"
import { MeshPortalMaterial, MeshReflectorMaterial, Stars } from "@react-three/drei"
import { MirrorShader } from "three/examples/jsm/Addons.js"
import { DoubleSide, MeshPhongMaterial, MeshToonMaterial } from "three/webgpu"

const InfoBackground = () => { 
    return (
        <mesh>
            <ambientLight color={0xffffff} intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <Stars fade={true} />
            <mesh >
                <sphereGeometry/>
            </mesh>
            <mesh 
                rotation={[-deg(90), 0, 0]}
                receiveShadow={true}
            >
                <planeGeometry 
                    args={[100, 100]}
                    attach="geometry"
                />
                {/* <meshBasicMaterial 
                    side={DoubleSide}
                    color={0x000000}
                    attach="material"
                /> */}
                <MeshReflectorMaterial 
                    side={DoubleSide}
                    mirror={10}
                    attach="material"
                />
            </mesh>
        </mesh>
    )
}

export default InfoBackground