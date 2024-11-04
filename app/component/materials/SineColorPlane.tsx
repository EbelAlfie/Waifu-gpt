import { deg } from "@/utils/angle"
import { DoubleSide } from "three"

const vertShader = `
varying vec4 glPos ;
void main() {
  vec4 mvPosition = modelMatrix * vec4(position, 0.5);

  mvPosition.y = sin(mvPosition.x * 2.0) + 3.0;
//   mvPosition.x = cos(mvPosition.y);
//   mvPosition.z = sin(mvPosition.x * 2.0) + 3.0;

  vec4 viewPosition = viewMatrix * mvPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  glPos = mvPosition; 
}
`

const fragShader =  `
varying vec4 glPos ;
void main() {
    gl_FragColor = vec4(glPos.rgb, 1.0);
}
`

export const SineColorPlane = () => {
    return (
        <>
            <mesh position={[0, 5, 0]} scale={10} rotation={[-deg(90), 0, 0]}>
                <planeGeometry args={[1, 1, 32, 32]}/>
                <shaderMaterial
                    side={DoubleSide}
                    fragmentShader={fragShader}
                    vertexShader={vertShader}
                    wireframe
                />
            </mesh>
        </>
    )
}