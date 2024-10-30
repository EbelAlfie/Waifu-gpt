import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import { forwardRef } from "react";
import { Points } from "three";
import fragment_shader from "../shader/fragment_shader";
import vertex_shader from "../shader/vertex_shader";
import { useFrame } from "@react-three/fiber";

export const DebugMesh = () => {
  
  return (
    <mesh 
        position={[0, 1, 0]}
    >
        <sphereGeometry />
        <shaderMaterial 
            uniforms={
                { time: { value: 0.0 }, fade: { value: 1.0 } }
            }
            fragmentShader={fragment_shader}
            vertexShader={vertex_shader}
        />
    </mesh>
  )
}