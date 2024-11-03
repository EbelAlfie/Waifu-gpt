import { Cloud, Clouds } from "@react-three/drei"
import { Color } from "@react-three/fiber"
import { useRef } from "react"
import { MeshLambertMaterial, Object3DEventMap, REVISION } from "three"

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
    return (
        <>
            <mesh >
                <Cloud 
                    color={props.color}
                />
                <cloudMaterial />
            </mesh>
        </>
    )
}

export default CharacterFog