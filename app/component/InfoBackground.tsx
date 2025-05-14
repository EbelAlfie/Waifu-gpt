import { deg } from "@/app/global/utils"
import { MeshReflectorMaterial } from "@react-three/drei"
import { GenshinStars } from "./3dmodels/Stars"
import CharacterMist from "./3dmodels/Mist"
import CharaSky from "./3dmodels/CharaSky"
import Character from "./3dmodels/Character"
import { Theme, ThemeType } from "../hooks/useTheme"
import { useContext } from "react"

const InfoBackground = () => {
    const theme: ThemeType = useContext(Theme)
    return (
        <>
            <ambientLight color={0xffffff} intensity={0.8} />
            <pointLight intensity={1} />
            <hemisphereLight color={0xffffff} intensity={2} />
            <GenshinStars
                fade
                factor={4} 
                radius={1}
                count={1000}
                speed={3}
            />

            {/* <GenshinCloud 
                color = "#169fc5"
            /> */}
            <CharacterMist
                color={theme.mistColor}
                radius={15}
            />

            {/* <SineColorPlane /> */}
            
            {/* <DebugMesh /> */}

            <CharaSky 
                color={theme.skyColor}
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
                    color={theme.floorColor}
                />
            </mesh>
           
        </>
    )
}

export default InfoBackground