import { deg } from "@/utils/angle"
import { MeshReflectorMaterial, Stars, useTexture } from "@react-three/drei"
import { Vector2 } from "three/webgpu"

const InfoBackground = () => {
    return (
        <>
            <ambientLight color={0xffffff} intensity={0.8} />
            <pointLight intensity={1} position={[0, 6, 0]} />
            <hemisphereLight intensity={1} position={[0, 0, 0]} />
            <Stars 
                fade
                factor={4} 
                radius={3}
                count={200}
            />
            
            <mesh 
                position={[0, 1, 0]}
            >
                <sphereGeometry />
            </mesh>
            
            <mesh 
                rotation={[-deg(90), 0, 0]}
                receiveShadow={true}
            >
                <circleGeometry 
                    args={[10]}
                    attach="geometry"
                />
                <MeshReflectorMaterial 
                    mirror = {0.75}
                    mixBlur = {10}
                    mixStrength = {2}
                    resolution = {1024}
                    blur={[0, 0]}
                    normalScale = {new Vector2(0)}
                    color="#a0a0a0"
                />
            </mesh>
           
        </>
    )
}

export default InfoBackground