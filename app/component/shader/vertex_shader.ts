export default `
uniform float time;
attribute float size;
void main() {
  vec4 mvPosition ;
  mvPosition = modelViewMatrix * vec4(position, 0.5);

  vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_PointSize = 10.0 * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
  gl_Position = projectedPosition;
}
`