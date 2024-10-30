import {version} from "@react-three/drei/helpers/constants"

export default `uniform float time;
uniform sampler2D pointTexture;
uniform float fade;
varying vec3 vColor;
void main() {
float opacity = 1.0;
if (fade == 1.0) {
    float d = distance(gl_PointCoord, vec2(0.5, 0.5));
    opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
}
gl_FragColor = vec4(1.0, 1.0, 0.0, opacity);

#include <tonemapping_fragment>
    #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
}`