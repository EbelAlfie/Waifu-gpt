import { deg } from "@/utils/angle"
import {version} from "@react-three/drei/helpers/constants"

const fragShader =  `
uniform float time;
uniform sampler2D pointTexture;
uniform float fade;
varying vec3 vColor;
void main() {
    float r = 0.5 * sin(0.5 + 20.0) ;
    float g = 0.5 * sin(0.1 + 25.0) ;
    float b = 0.5 * sin(0.3 + 30.0) ;
    vec3 col = vec3(r, g, b) ;
    gl_FragColor = vec4(col, 1.0);

    #include <tonemapping_fragment>
        #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
}
`

const vertShader = `
// uniform float time;
// attribute float size;
void main() {
  vec4 mvPosition = modelMatrix * vec4(position, 0.5);

  mvPosition.y += sin(mvPosition.x * 2.0) * 0.5;

  vec4 viewPosition = viewMatrix * mvPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

export const SineColorPlane = () => {
    return (
        <>
            <mesh position={[0, 5, 0]} scale={10} rotation={[-deg(90), 0, 0]}>
                <planeGeometry args={[1, 1, 32, 32]}/>
                <shaderMaterial
                    // fragmentShader={fragShader}
                    vertexShader={vertShader}
                />
            </mesh>
        </>
    )
}