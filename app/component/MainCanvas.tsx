"use client";

import { Canvas } from "@react-three/fiber";
import { Color, Fog, Scene } from "three";
import InfoBackground from "./InfoBackground";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const MainCanvas = () => {
    let scene = new Scene();
	scene.background = new Color(0x169fc5)
    scene.fog = new Fog(0x169fc5, 1, 15)
    
    return (
        <Canvas
            shadows={true}
            scene={scene}
        > 
            <OrbitControls makeDefault position={[0, 0, 0]}/>
            <axesHelper scale={10}/>
            <InfoBackground />           
        </Canvas>
    )
}

export default MainCanvas