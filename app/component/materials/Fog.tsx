"use client";

import { CloudInstance, Clouds } from "@react-three/drei"
import { Color, useFrame } from "@react-three/fiber"
import { Group, InstancedMesh, Material, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3DEventMap, REVISION, ShaderMaterial, Spherical, Vector3, WebGLProgramParametersWithUniforms } from "three"
import texture from "@/assets/tex/cloud.png"
import { useRef } from "react"
import { MistMaterial } from "./cloud/CustomCloud";
import { GenshinClouds } from "./cloud/GenshinCloud";

type CloudProp = {
    color: Color | string | number
}

const CharacterFog = (props: CloudProp)=> {

  const cloudRef = useRef<Group<Object3DEventMap>>(null)
  
  const distribute = () => {
    return {
      point: new Vector3().setFromSpherical(new Spherical(10, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI)),
    }
  }

  useFrame((state) => {
    const mesh = cloudRef.current?.children[1];

    const material: Material = 
      (mesh instanceof InstancedMesh) && mesh.material
    
    return (material instanceof MistMaterial) && (material.shaders) &&
      (material.shaders.uniforms.time.value = state.clock.getElapsedTime())
  })

  return (
        <Clouds 
          ref={cloudRef}
          texture={texture.src}
        >
          <CloudInstance
              bounds={[1, 1, 1]}
              color={props.color}
              distribute={distribute}
              concentrate = "inside"
              volume={30}
              scale={5.0}
              growth={10}
          />
        </Clouds>
    )
}

export default CharacterFog