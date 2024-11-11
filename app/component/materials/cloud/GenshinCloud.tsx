import * as React from 'react'
import {
  REVISION,
  DynamicDrawUsage,
  Color,
  Group,
  Texture,
  Vector3,
  InstancedMesh,
  Material,
  MeshLambertMaterial,
  Matrix4,
  Quaternion,
  BufferAttribute,
  DoubleSide,
  WebGLProgramParametersWithUniforms,
} from 'three'
import { MaterialNode, extend, applyProps, useFrame, ReactThreeFiber } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { setUpdateRange } from '@react-three/drei/helpers/deprecated'

const CLOUD_URL = 'https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png'

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
            
            float cameraAngle = atan(cameraPosition.x, cameraPosition.z) ;
            vec3 pos = vec3(position) ;
            pos.x += cos(cameraAngle) ;
            pos.z += sin(cameraAngle) ;

            vec4 cloudPos = projectionMatrix * modelViewMatrix * vec4(pos, 1.0) ;
            gl_Position = cloudPos;
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

type CloudState = {
  uuid: string
  index: number
  segments: number
  dist: number
  matrix: Matrix4
  bounds: Vector3
  position: Vector3
  volume: number
  length: number
  ref: React.MutableRefObject<Group>
  speed: number
  growth: number
  opacity: number
  fade: number
  density: number
  rotation: number
  rotationFactor: number
  color: Color
}

type CloudsProps = JSX.IntrinsicElements['group'] & {
  /** Optional cloud texture, points to a default hosted on rawcdn.githack */
  texture?: string
  /** Maximum number of segments, default: 200 (make this tight to save memory!) */
  limit?: number
  /** How many segments it renders, default: undefined (all) */
  range?: number
  /** Which material it will override, default: MeshLambertMaterial */
  material?: typeof Material
  /** Frustum culling, default: true */
  frustumCulled?: boolean
}

const parentMatrix = /* @__PURE__ */ new Matrix4()
const translation = /* @__PURE__ */ new Vector3()
const rotation = /* @__PURE__ */ new Quaternion()
const cpos = /* @__PURE__ */ new Vector3()
const cquat = /* @__PURE__ */ new Quaternion()
const scale = /* @__PURE__ */ new Vector3()

const context = /* @__PURE__ */ React.createContext<React.MutableRefObject<CloudState[]>>(null!)
export const GenshinClouds = /* @__PURE__ */ React.forwardRef<Group, CloudsProps>(
  (
    { children, material = MeshLambertMaterial, texture = CLOUD_URL, range, limit = 200, frustumCulled, ...props },
    fref
  ) => {
    const CloudMaterial = React.useMemo(() => {
      return class extends (material as typeof Material) {
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
                 float rad = length(position.xz);
                 float angle = atan(position.x, position.z);
                 float orbitX = rad * cos(angle + time/100.0) ;
                 float orbitZ = rad * sin(angle + time/100.0) ;
                 vec3 orbitPos = vec3(orbitX, position.y, orbitZ) ;

                 vec4 mvPosition = modelViewMatrix * vec4(orbitPos, 0.5);
                 gl_Position = projectionMatrix * mvPosition; 
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
    }, [material])

    extend({ CloudMaterial })

    const instance = React.useRef<InstancedMesh>(null!)
    const clouds = React.useRef<CloudState[]>([])
    const opacities = React.useMemo(() => new Float32Array(Array.from({ length: limit }, () => 1)), [limit])
    const colors = React.useMemo(() => new Float32Array(Array.from({ length: limit }, () => [1, 1, 1]).flat()), [limit])
    const cloudTexture = useTexture(texture) as Texture

    let t = 0
    let index = 0
    let config: CloudState
    const qat = new Quaternion()
    const dir = new Vector3(0, 0, 1)
    const pos = new Vector3()

    useFrame((state, delta) => {
      t = state.clock.getElapsedTime()
      parentMatrix.copy(instance.current.matrixWorld).invert()
      state.camera.matrixWorld.decompose(cpos, cquat, scale)

      for (index = 0; index < clouds.current.length; index++) {
        config = clouds.current[index]
        config.ref.current.matrixWorld.decompose(translation, rotation, scale)
        translation.add(pos.copy(config.position).applyQuaternion(rotation).multiply(scale))
        rotation.copy(cquat).multiply(qat.setFromAxisAngle(dir, (config.rotation += delta * config.rotationFactor)))
        scale.multiplyScalar(config.volume + ((1 + Math.sin(t * config.density * config.speed)) / 2) * config.growth)
        config.matrix.compose(translation, rotation, scale).premultiply(parentMatrix)
        config.dist = translation.distanceTo(cpos)
      }

      // Depth-sort. Instances have no specific draw order, w/o sorting z would be random
      clouds.current.sort((a, b) => b.dist - a.dist)
      for (index = 0; index < clouds.current.length; index++) {
        config = clouds.current[index]
        opacities[index] = config.opacity * (config.dist < config.fade - 1 ? config.dist / config.fade : 1)
        instance.current.setMatrixAt(index, config.matrix)
        instance.current.setColorAt(index, config.color)
      }

      // Update instance
      instance.current.geometry.attributes.cloudOpacity.needsUpdate = true
      instance.current.instanceMatrix.needsUpdate = true
      if (instance.current.instanceColor) instance.current.instanceColor.needsUpdate = true
    })

    React.useLayoutEffect(() => {
      const count = Math.min(limit, range !== undefined ? range : limit, clouds.current.length)
      instance.current.count = count
      setUpdateRange(instance.current.instanceMatrix, { offset: 0, count: count * 16 })
      if (instance.current.instanceColor) {
        setUpdateRange(instance.current.instanceColor, { offset: 0, count: count * 3 })
      }
      setUpdateRange(instance.current.geometry.attributes.cloudOpacity as BufferAttribute, { offset: 0, count: count })
    })

    let imageBounds = [cloudTexture!.image.width ?? 1, cloudTexture!.image.height ?? 1]
    const max = Math.max(imageBounds[0], imageBounds[1])
    imageBounds = [imageBounds[0] / max, imageBounds[1] / max]

    return (
      <group ref={fref} {...props}>
        <context.Provider value={clouds}>
          {children}
          <instancedMesh
            matrixAutoUpdate={false}
            ref={instance}
            args={[null as any, null as any, limit]}
            frustumCulled={frustumCulled}
          >
            <instancedBufferAttribute usage={DynamicDrawUsage} attach="instanceColor" args={[colors, 3]} />
            <planeGeometry args={[...imageBounds] as any}>
              <instancedBufferAttribute
                usage={DynamicDrawUsage}
                attach="attributes-cloudOpacity"
                args={[opacities, 1]}
              />
            </planeGeometry>
            {/* <mistMaterial 
                    side={DoubleSide}
                    map={cloudTexture} 
                    depthWrite={false}
                    transparent
                /> */}
            <cloudMaterial key={material.name} map={cloudTexture} transparent depthWrite={false} />
          </instancedMesh>
        </context.Provider>
      </group>
    )
  }
)