export default `uniform float time;
attribute float size;
varying vec3 vColor;
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_PointSize = 100.0;
  gl_Position = projectedPosition;
}
// void main() {
//     vColor = color;
//     vec4 mvPosition ;
//     mvPosition = modelViewMatrix * vec4(position, 0.5);
    
//     gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
//     gl_Position = projectionMatrix * mvPosition;
// }`