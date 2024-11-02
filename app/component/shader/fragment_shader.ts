import {version} from "@react-three/drei/helpers/constants"

export default `
uniform float time;
uniform sampler2D pointTexture;
uniform float fade;
varying vec3 vColor;
void main() {
    float r = 0.5 * sin(time + 1.0) ;
    float g = 0.5 * sin(time + 2.0) ;
    float b = 0.5 * sin(time + 3.0) ;
    r = mix(0.278, 0.769, r); 
    g = mix(0.455, 0.71, g);  
    b = mix(0.4, 0.733, b);   
    vec3 col = vec3(r, g, b) ;
    gl_FragColor = vec4(col, 1.0);

    #include <tonemapping_fragment>
        #include <${version >= 154 ? 'colorspace_fragment' : 'encodings_fragment'}>
}`

//putih biru muda kuning oranye ? merah ungu biru tua putih
/** HEX
 * #7990b7 vec3(0.475, 0.565, 0.718)
 * #769ebb vec3(0.463, 0.62, 0.733)
 * #6690ab vec3(0.4, 0.565, 0.671)
 * #8b8c80 vec3(0.545, 0.549, 0.502)
 *  #b4b593 vec3(0.706, 0.71, 0.576)
 * #ad7474 vec3(0.678, 0.455, 0.455)
 *  #c46967 vec3(0.769, 0.412, 0.404)
 * #5156a6 vec3(0.318, 0.337, 0.651)
 *  #474671 vec3(0.278, 0.275, 0.443)
 */