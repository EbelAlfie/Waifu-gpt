import { deg } from "@/global/utils/angle"
import { MeshReflectorMaterial } from "@react-three/drei"
import { Vector2 } from "three/webgpu"
import { DebugMesh } from "./models/DebugGeometry"
import { GenshinStars } from "./models/Stars"
import { SineColorPlane } from "./models/SineColorPlane"
import { GenshinCloud } from "./models/materials/cloud/CustomCloud"
import CharacterMist from "./models/Mist"
import CharaSky from "./models/CharaSky"
import Character from "./models/Character"

const InfoBackground = () => {
    return (
        <>
            <ambientLight color={0xffffff} intensity={0.8} />
            <pointLight intensity={1} position={[0, 6, 0]} />
            <hemisphereLight color={0xffffff} intensity={1} position={[0, 6, 0]} />
            <GenshinStars
                fade
                factor={4} 
                radius={1}
                count={1000}
                speed={2}
            />

            {/* <GenshinCloud 
                color = "#169fc5"
            /> */}
            <CharacterMist
                color="#169fc5"
                radius={25}
            />

            {/* <SineColorPlane /> */}
            
            {/* <DebugMesh /> */}

            <CharaSky 
                color={0x19566d}
                radius={1.5}
            />
            
            <Character />

            <mesh 
                rotation={[-deg(90), 0, 0]}
                scale={50}
                receiveShadow={true}
            >
                <circleGeometry 
                    args={[2.5]}
                    attach="geometry"
                />
                <MeshReflectorMaterial 
                    mirror = {0.8}
                    mixBlur = {10}
                    mixStrength = {2}
                    resolution = {1080}
                    color="#a0a0a0"
                />
            </mesh>
           
        </>
    )
}

export default InfoBackground