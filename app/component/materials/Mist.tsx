
const vertShader = `
#include<fog_vertex>
void main() {

}
`

const fragmentShader = `
#include<opaque_fragment>
void main() {
    
}
`

export const Mist = () => {
    return (
        <mesh>
            <planeGeometry />
            <shaderMaterial 
                fragmentShader={fragmentShader}
                vertexShader={vertShader}
            />
        </mesh>
    )
}

