import { deg } from "@/utils/angle"
import { Cloud, Clouds, Effects, MeshPortalMaterial, MeshReflectorMaterial, Sky, Stars } from "@react-three/drei"
import { MirrorShader } from "three/examples/jsm/Addons.js"
import { DoubleSide, MeshPhongMaterial, MeshToonMaterial, ShaderMaterial } from "three/webgpu"

const InfoBackground = () => { 
    return (
        <>
            <ambientLight color={0xffffff} intensity={0.1} />
            <Stars 
                fade={true}
                factor={3} 
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
                    side = {DoubleSide}
                    mirror = {1}
                    mixBlur = {0}
                    mixContrast = {1}
                    mixStrength = {1}
                    blur = {[0, 0]}
                    distortion = {0}
                    resolution = {900}
                    attach = "material"
                />
            </mesh>
           
        </>
    )
}

export default InfoBackground