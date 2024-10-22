"use client";

import { Canvas } from "@react-three/fiber"
import { useReducer } from "react";
import { MeshBasicMaterial } from "three"
import { SkyGeometry } from "three/examples/jsm/Addons.js"

const InfoBackground = () => {
    let geometry = new SkyGeometry()
    let material = new MeshBasicMaterial({
        color : "#169fc5",
        fog: true
    })
    
    return (
        <Canvas className="z-[-1]">
            <mesh
                geometry={geometry}
                material={material}
            >
            </mesh>
        </Canvas>
    )
}

export default InfoBackground