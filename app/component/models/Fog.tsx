import { FogProps, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export const FogDefault = (props: FogProps) => {
    THREE.ShaderChunk.fog_pars_vertex = `
    #ifdef USE_FOG

        varying float vFogDepth;

    #endif
    `
    
    THREE.ShaderChunk.fog_vertex = `
    #ifdef USE_FOG

        vFogDepth = - mvPosition.z;

    #endif
    `
    
    THREE.ShaderChunk.fog_pars_fragment = `
        #ifdef USE_FOG

            uniform vec3 fogColor;
            varying float vFogDepth;

            #ifdef FOG_EXP2

                uniform float fogDensity;

            #else

                uniform float fogNear;
                uniform float fogFar;

            #endif

        #endif
    `

    THREE.ShaderChunk.fog_fragment = `
    #ifdef USE_FOG

        #ifdef FOG_EXP2

            float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

        #else

            float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

        #endif

        gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

    #endif
    `

    return (
        <fog 
            color={props.color}
            near={props.near}
            far={props.far}
            attach="fog"
        />
    )
}

export const NewFog = (
    props: FogProps
) => {
    
    THREE.ShaderChunk.fog_pars_vertex = `
    #ifdef USE_FOG
      varying vec3 vWorldPosition;
    #endif
    `
    
    THREE.ShaderChunk.fog_vertex = `
    #ifdef USE_FOG
      vWorldPosition = mvPosition.xyz;
    #endif
    `
    
    THREE.ShaderChunk.fog_pars_fragment = `
        #ifdef USE_FOG
            uniform vec3 fogColor;
            varying vec3 vWorldPosition;
            #ifdef FOG_EXP2
                uniform float fogDensity;
            #else
                uniform float fogNear;
                uniform float fogFar;
            #endif
        #endif
    `

    THREE.ShaderChunk.fog_fragment = `
        #ifdef USE_FOG
            #ifdef FOG_EXP2

                vec3 fogOrigin = cameraPosition;
                vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
                float fogDepth = distance(vWorldPosition, fogOrigin);
                float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
                float heightFactor = 0.05;
                float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
                    1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
                fogFactor = saturate(fogFactor);
            #else

                float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

            #endif
            gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
        #endif
    `

    return (
        <fogExp2 
            color={props.color}
            // near={props.near}
            // far={props.far}
            density={0.000005}
            attach="fog"
        />
    )
}