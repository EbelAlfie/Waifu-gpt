"use client";

import { CloudInstance, Clouds } from "@react-three/drei"
import { Color, useFrame } from "@react-three/fiber"
import { Group, InstancedMesh, Material, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3DEventMap, REVISION, ShaderMaterial, Spherical, Vector3, WebGLProgramParametersWithUniforms } from "three"
import texture from "@/assets/tex/cloud.png"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { GenshinClouds, MistMaterial } from "./materials/cloud/GenshinCloud";

type MistProp = {
    color: Color | string | number,
    radius?: number
}

const CharacterMist = ({radius = 20, ...props} : MistProp)=> {

  const cloudRef = useRef<Group<Object3DEventMap>>(null)

  useFrame((state) => {
    const mesh = cloudRef.current?.children[1];

    const material: Material = 
      (mesh instanceof InstancedMesh) && mesh.material ;
    
    return (material instanceof MistMaterial) && (material.shaders) &&
      (material.shaders.uniforms.time.value = state.clock.getElapsedTime())
  })

  const distribute = useCallback(() => {
    return {
      point: new Vector3().setFromSpherical(new Spherical(radius, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI)),
    }
  }, [])

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
              growth={30}
              segments={100}
          />
        </Clouds>
    )
}

export default CharacterMist