import * as THREE from "three"

export const initializeFog = (scene: THREE.Scene) => {
    THREE.ShaderChunk.fog_pars_fragment = `
    #ifdef USE_FOG

        uniform vec3 fogColor;
        varying float vFogDepth;

        varying vec3 vWorldPos;

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
                vec3 fogOrigin = cameraPosition;
                vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
                float height = 0.05;
                float fogFactor = heigh * exp(-fogOrigin.y * fogDensity) * (
                    1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
                fogFactor = saturate(fogFactor);
            #endif

            gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

        #endif
    `
    THREE.ShaderChunk.fog_pars_vertex = `
    #ifdef USE_FOG

        varying float vFogDepth;
        varying vec3 vWorldPos;

    #endif
    `
    THREE.ShaderChunk.fog_vertex = `
    #ifdef USE_FOG

        vFogDepth = - mvPosition.z;
        vWorldPos = worldPosition.xyz ;
    #endif
    `
    scene.fog = new THREE.Fog(0x77d4f0, 1, 25)
}