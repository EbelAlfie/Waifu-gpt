import { deg } from "@/utils/angle"
import { MeshReflectorMaterial } from "@react-three/drei"
import { Vector2 } from "three/webgpu"
import { DebugMesh } from "./models/materials/DebugGeometry"
import { StarsF } from "./models/materials/Stars"
import { SineColorPlane } from "./models/materials/SineColorPlane"
import { GenshinCloud } from "./models/materials/cloud/CustomCloud"
import CharacterMist from "./models/materials/Mist"
import CharaSky from "./models/CharaSky"

const InfoBackground = () => {
    return (
        <>
            <ambientLight color={0x19566d} intensity={0.8} />
            <pointLight intensity={1} position={[0, 6, 0]} />
            <hemisphereLight intensity={1} position={[0, 6, 0]} />
            <StarsF
                fade
                factor={4} 
                radius={3}
                count={1000}
                speed={2}
            />

            <GenshinCloud 
                color = "#169fc5"
            />
            <CharacterMist
                color="#169fc5"
            />

            <SineColorPlane />
            
            <DebugMesh />

            <CharaSky 
                color={0x19566d}
                radius={1.5}
            />
            
            <mesh 
                rotation={[-deg(90), 0, 0]}
                scale={50}
                receiveShadow={true}
            >
                <circleGeometry 
                    args={[3]}
                    attach="geometry"
                />
                <MeshReflectorMaterial 
                    mirror = {0.75}
                    mixBlur = {10}
                    mixStrength = {2}
                    resolution = {1080}
                    blur={[0, 0]}
                    normalScale = {new Vector2(0)}
                    color="#a0a0a0"
                />
            </mesh>
           
        </>
    )
}

export default InfoBackground