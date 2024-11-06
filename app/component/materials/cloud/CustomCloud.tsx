import { useTexture } from "@react-three/drei"
import { Color, DoubleSide, DynamicDrawUsage, MeshLambertMaterial, REVISION, WebGLProgramParametersWithUniforms } from "three"
import defaultTexture from "@/assets/tex/cloud.png"
import { extend, MaterialNode, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"

export class MistMaterial extends MeshLambertMaterial {
    shaders?: WebGLProgramParametersWithUniforms

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
              vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0) ;
              gl_Position = pos;
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
          this.shaders = shader
        }
      }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mistMaterial: MaterialNode<MistMaterial, typeof MistMaterial>;
        }
    }
}

type CloudProp = {
    color: Color | string | number,
    texture?: string,
    limit?: number
}

export const GenshinCloud = ({color = 0xffffff, texture = defaultTexture.src, limit = 100}: CloudProp) => {

    const matRef = useRef<MistMaterial>(null)

    extend({ MistMaterial })
    
    const tex = useTexture(texture)
    const opacities = useMemo(() => new Float32Array(Array.from({ length: limit }, () => 1)), [limit])
    const colors = useMemo(() => new Float32Array(Array.from({ length: limit }, () => [1, 1, 1]).flat()), [limit])

    const rect = [tex!.image.width ?? 1, tex!.image.height ?? 1]
    const max = Math.max(rect[0], rect[1])
    const rectBound = [rect[0]/ max, rect[1]/ max]

    useFrame((state) => {
        const time = state.clock.elapsedTime
        console.log(matRef)
    })

    return (
        <group>
            <mesh position={[0,5,0]}>
                <planeGeometry args={[...rectBound] as any} >
                    <bufferAttribute 
                        usage={DynamicDrawUsage}
                        attach="attributes-cloudOpacity"
                        args={[opacities, 1]}
                    />
                </planeGeometry>
                <mistMaterial 
                    ref={matRef}
                    side={DoubleSide}
                    map={tex} 
                    depthWrite={false}
                    color={color} 
                    transparent
                />
            </mesh> 
        </group>
    )
}