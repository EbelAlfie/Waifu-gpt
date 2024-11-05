"use client";

import { CloudInstance, Clouds } from "@react-three/drei"
import { Color, useFrame } from "@react-three/fiber"
import { Group, MeshLambertMaterial, Object3DEventMap, REVISION, ShaderMaterial, Spherical, Vector3, WebGLProgramParametersWithUniforms } from "three"
import texture from "@/assets/tex/cloud.png"
import { ForwardedRef, forwardRef, useRef } from "react"

class MistMaterial extends MeshLambertMaterial {
    constructor() {
        super()
          const opaque_fragment = parseInt(REVISION.replace(/\D+/g, '')) >= 154 ? 'opaque_fragment' : 'output_fragment'
          this.onBeforeCompile = (shader) => {
            shader.uniforms.time = { value : 0.0 }
            
            shader.vertexShader =
              `uniform float time ;
               attribute float cloudOpacity;
               varying float vOpacity;
              ` +
              shader.vertexShader.replace(
                '#include <fog_vertex>',
                `#include <fog_vertex>
                 vOpacity = cloudOpacity;
                 float rad = length(position.xz);
                 float angle = atan(position.x, position.z);
                 float orbitX = rad * cos(angle + time/100.0) ;
                 float orbitZ = rad * sin(angle + time/100.0) ;
                 vec3 orbitPos = vec3(orbitX, position.y, orbitZ) ;
                 gl_Position = vec4(orbitPos, 1.0) ;
                `
              )
            shader.fragmentShader =
              `varying float vOpacity;
              ` +
              shader.fragmentShader.replace(
                `#include <${opaque_fragment}>`,
                `#include <${opaque_fragment}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `
              )
            
            this.userData = { "shader": shader }
          }
    }
}

type CloudProp = {
    color: Color | string | number
}

const CharacterFog = (props: CloudProp)=> {

  const cloudRef = useRef<Group<Object3DEventMap>>(null)
  const matRef = useRef<MistMaterial>(null)
  
  const distribute = () => {
    return {
      point: new Vector3().setFromSpherical(new Spherical(10, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI)),
    }
  }

  useFrame((state) => {
    console.log(cloudRef.current)
    return cloudRef.current
  })

  // useFrame(state => 
  //   matRef.current &&
  //   (matRef.current.userData = state.clock.getElapsedTime())
  // )

  return (
      <mesh
      >
        <Clouds 
          texture={texture.src}
          material={MistMaterial}
        >
          <CloudInstance
              ref={cloudRef}
              bounds={[1, 1, 1]}
              color={props.color}
              distribute={distribute}
              concentrate = "inside"
              volume={30}
              scale={5.0}
              growth={10}
          />
        </Clouds>
      </mesh>
    )
}

export default CharacterFog