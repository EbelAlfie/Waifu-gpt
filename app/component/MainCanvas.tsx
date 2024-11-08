"use client";

import { Canvas, } from "@react-three/fiber";
import { Color, Scene } from "three";
import InfoBackground from "./InfoBackground";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import CoordHelper, { CoordProps } from "./CoordHelper";
import { initializeFog } from "@/utils/three";

const MainCanvas = () => {
    const [coord, setCoord] = useState<CoordProps>()
    const camRef = useRef<CameraControls>(null)

    useEffect(() => {
        camRef.current?.addEventListener('control', () => {
            const position = camRef.current && camRef.current.camera.position
            updateCurrentCoord(
                {
                    x: position?.x,
                    y: position?.y,
                    z: position?.z
                }
            )  
        })
    }, [camRef.current?.camera.position])

    let scene = new Scene();
	scene.background = new Color(0x169fc5)
    // initializeFog(scene)

    const updateCurrentCoord = (coord?: CoordProps) => {
        console.log(coord)
        setCoord(coord)
    }
   
    const ControlHelper = () => {   
        return (
            <CameraControls 
                ref={camRef}
                makeDefault 
            />
        )
    } 

    return (
        <>
            <Canvas
                shadows = {true}
                scene = {scene}
            > 
                <ControlHelper />
                <axesHelper scale={10}/>
                <InfoBackground />           
            </Canvas>
            <CoordHelper props={coord}/>
        </>
    )
}

export default MainCanvas