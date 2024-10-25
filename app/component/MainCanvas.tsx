"use client";

import { Canvas } from "@react-three/fiber";
import { Color, Fog, Scene } from "three";
import InfoBackground from "./InfoBackground";
import { OrbitControls, OrbitControlsChangeEvent, PerspectiveCamera } from "@react-three/drei";
import { useState } from "react";
import CoordHelper from "./CoordHelper";

const MainCanvas = () => {
    const [coord, setCoord] = useState<OrbitControlsChangeEvent>()

    let scene = new Scene();
	scene.background = new Color(0x169fc5)
    scene.fog = new Fog(0x169fc5, 1, 15)
    
    const updateCurrentCoord = (coord?: OrbitControlsChangeEvent) => {
        setCoord(coord)
    }

    return (
        <>
            <Canvas
                shadows={true}
                scene={scene}
            > 
                <OrbitControls 
                    makeDefault 
                    position={[0, 0, 0]}
                    onChange={updateCurrentCoord}
                />
                <axesHelper scale={10}/>
                <InfoBackground />           
            </Canvas>
            <CoordHelper props={coord} />
        </>
    )
}

export default MainCanvas