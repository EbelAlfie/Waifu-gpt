import { ReactThreeFiber } from "@react-three/fiber"
import { ShaderMaterial } from "three"
import { version } from '@react-three/drei/helpers/constants'

export class StarfieldMaterial extends ShaderMaterial {
    constructor() {
      super({
        uniforms: { time: { value: 0.0 }, fade: { value: 1.0 } },
        vertexShader: /* glsl */ `
        uniform float time;
        uniform int starType ;
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          float rad = length(position.xz);
          float angle = atan(position.x, position.z);
          float orbitX = rad * cos(angle + time/100.0) ;
          float orbitZ = rad * sin(angle + time/100.0) ;
          vec3 orbitPos = vec3(orbitX, position.y, orbitZ) ;
  
          vec4 mvPosition = modelViewMatrix * vec4(orbitPos, 0.5);
          
          gl_PointSize = size * (15.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
          gl_Position = projectionMatrix * mvPosition;
        }`,
        fragmentShader: /* glsl */ `
        uniform float time;
        uniform sampler2D pointTexture;
        uniform float fade;
        varying vec3 vColor;
        void main() {
          float opacity = 1.0;
          if (fade == 1.0) {
            float d = distance(gl_PointCoord, vec2(0.5, 0.5));
            opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
          }
  
          float r = 0.5 * sin(time / 9.0) ;
          float g = 0.5 * sin(time / 6.5) ;
          float b = 0.5 * sin(time / 7.0) ;
          r = mix(0.278, 0.769, r);
          g = mix(0.455, 0.71, g);  
          b = mix(0.4, 0.733, b);   
          vec3 col = vec3(r, g, b) ;
          gl_FragColor = vec4(col, opacity);
  
          #include <tonemapping_fragment>
            #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
        }`,
      })
    }
  }
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        starfieldMaterial: ReactThreeFiber.MaterialNode<StarfieldMaterial, []>
      }
    }
  }