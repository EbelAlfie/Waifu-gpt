import {version} from "@react-three/drei/helpers/constants"

export default `
uniform float time;
uniform sampler2D pointTexture;
uniform float fade;
varying vec3 vColor;
void main() {
    float opacity = 1.0;

    float r = sin(time / 10.6) + 0.1 ;
    float g = sin(time/ 15.0) + 0.1 ;
    float b = sin(time/ 20.0) + 0.1 ;
    gl_FragColor = vec4(r, g, b, opacity);

    #include <tonemapping_fragment>
        #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
}`

//putih biru muda kuning oranye ? merah ungu biru tua putih