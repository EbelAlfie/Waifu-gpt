"use client";

import { Canvas } from "@react-three/fiber"
import { useReducer } from "react";
import { BoxGeometry, Color, CubeTexture, Euler, Fog, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from "three"
import { SkyGeometry } from "three/examples/jsm/Addons.js"

const InfoBackground = () => {
    let scene = new Scene();
	scene.background = new Color(0x169fc5);
    
    return (
        <Canvas 
            shadows
            scene={scene}
        > 
            <mesh>
                <ambientLight color={0xffffff} intensity={0.1} />
                <planeGeometry/>
                <sphereGeometry/>
            </mesh> 
        </Canvas>
    )
}

export default InfoBackground