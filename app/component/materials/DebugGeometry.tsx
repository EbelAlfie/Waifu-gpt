import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import { forwardRef, Ref, useRef } from "react";
import { Material, Mesh, Points, ShaderMaterial, SphereGeometry } from "three";
import fragment_shader from "../shader/fragment_shader";
import vertex_shader from "../shader/vertex_shader";
import { RootState, ThreeEvent, useFrame } from "@react-three/fiber";

export const DebugMesh = () => {
  const materialRef = useRef<ShaderMaterial>()
  const speed = 13

  useFrame(
    (state: RootState) => {
      materialRef.current 
      && (materialRef.current.uniforms.time.value = state.clock.getElapsedTime() * speed
    )}
  )

  const onPointerEnter = (event: ThreeEvent<PointerEvent>) => {
    const obj = ((event.object as Mesh).material as ShaderMaterial) 
    console.log(obj.vertexColors)
  }

  return (
    <mesh 
        position={[0, 1, 0]}
        onPointerOver={onPointerEnter}
    >
        <sphereGeometry>
          <bufferAttribute attach="attributes-size" args={[new Float32Array(100), 1]}/>
        </sphereGeometry>
        <shaderMaterial 
            ref={materialRef as Ref<ShaderMaterial>}
            uniforms={
                { 
                  time: { value: 0.0 }, 
                  size: { value: 100 },
                  fade: { value: 1.0 } 
                }
            }
            fragmentShader={fragment_shader}
            vertexShader={vertex_shader}
        />
    </mesh>
  )
}