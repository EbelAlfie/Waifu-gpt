import { Cloud } from "@react-three/drei"
import { Color } from "@react-three/fiber"
import { useRef } from "react"
import { Group, MeshLambertMaterial, Object3DEventMap, REVISION, Spherical, Vector3 } from "three"

class MistMaterial extends MeshLambertMaterial {
    constructor() {
        super()
          const opaque_fragment = parseInt(REVISION.replace(/\D+/g, '')) >= 154 ? 'opaque_fragment' : 'output_fragment'
          this.onBeforeCompile = (shader) => {
            shader.vertexShader =
              `attribute float cloudOpacity;
               varying float vOpacity;
              ` +
              shader.vertexShader.replace(
                '#include <fog_vertex>',
                `#include <fog_vertex>
                 vOpacity = cloudOpacity;
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
          }
    }
}

type CloudProp = {
    color: Color | string | number
}

const CharacterFog = (props: CloudProp) => {
  
  const distribute = () => {
    return {
      point: new Vector3().setFromSpherical(new Spherical(10, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI))
    }
  }

  return (
      <mesh >
          <Cloud 
              bounds={[1, 1, 1]}
              color={props.color}
              distribute={distribute}
              concentrate = "inside"
              volume={20}
              scale={10.0}
              growth={10}
          />
      </mesh>
    )
}

export default CharacterFog