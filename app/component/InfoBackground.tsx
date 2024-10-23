"use client";

import { Canvas } from "@react-three/fiber"
import { useReducer } from "react";
import { BoxGeometry, Euler, MeshBasicMaterial, SphereGeometry, Vector3 } from "three"
import { SkyGeometry } from "three/examples/jsm/Addons.js"

const InfoBackground = () => {
    let geometry = new SphereGeometry()
    let material = new MeshBasicMaterial({
        color : "#169fc5",
        fog: true
    })
    
    return (
        <Canvas>
            <mesh
                geometry={geometry}
                material={material}
                rotation={new Euler(0.5, 0.5, 0.5)}
            >
            </mesh>
        </Canvas>
    )
}

export default InfoBackground