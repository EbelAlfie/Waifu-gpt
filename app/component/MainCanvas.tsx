"use client";

import { Canvas, } from "@react-three/fiber";
import { Color, Fog, Scene, Vector3 } from "three";
import InfoBackground from "./InfoBackground";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import CoordHelper, { CoordProps } from "./CoordHelper";
import { initializeFog } from "@/utils/three";

const MainCanvas = () => {
    const [coord, setCoord] = useState<CoordProps>()
    const camRef = useRef<CameraControls>(null)

    let scene = new Scene();
	scene.background = new Color(0x169fc5)
    // scene.fog = new Fog(0xffffff, 2, 15)
    // initializeFog(scene, 0x77d4f0)

    const updateCurrentCoord = () => {
        const position = new Vector3()
        camRef.current && camRef.current.getPosition(position)
        setCoord({
            x: position.x,
            y: position.y,
            z: position.z
        })
    }

    return (
        <>
            <Canvas
                shadows = {true}
                scene = {scene}
            > 
                <CameraControls 
                    ref={camRef}
                    onChange={updateCurrentCoord}
                    makeDefault 
                />  
                <axesHelper scale={10}/>
                <InfoBackground />           
            </Canvas>
            <CoordHelper props={coord}/>
        </>
    )
}

export default MainCanvas