import { deg } from "@/utils/angle"
import { MeshPortalMaterial, MeshReflectorMaterial, Stars } from "@react-three/drei"
import { MirrorShader } from "three/examples/jsm/Addons.js"
import { DoubleSide, MeshPhongMaterial, MeshToonMaterial } from "three/webgpu"

const InfoBackground = () => { 
    return (
        <mesh>
            <ambientLight color={0xffffff} intensity={0.1} />
            <Stars 
                fade={true} 
                radius={3}
                count={1000}
            />
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
                <MeshReflectorMaterial 
                    side={DoubleSide}
                    mirror={1}
                    mixBlur={0}
                    mixContrast={1}
                    mixStrength={1}
                    blur={[0, 0]}
                    distortion={0}
                    resolution={1080}
                    attach="material"
                />
            </mesh>
        </mesh>
    )
}

export default InfoBackground