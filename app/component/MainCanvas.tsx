"use client";

import { Canvas, RootState, useFrame } from "@react-three/fiber";
import { Color, Fog, FogExp2, PerspectiveCamera, Scene } from "three";
import InfoBackground from "./InfoBackground";
import { CameraControls, OrbitControls, OrbitControlsChangeEvent } from "@react-three/drei";
import { DragEventHandler, useEffect, useRef, useState } from "react";
import CoordHelper from "./CoordHelper";

const MainCanvas = () => {
    const [coord, setCoord] = useState<OrbitControlsChangeEvent>()

    let scene = new Scene();
	scene.background = new Color(0x169fc5)
    scene.fog = new Fog(0x77d4f0, 2, 15)

    const updateCurrentCoord = (coord?: CameraControls) => {
        console.log(coord)
        // setCoord(coord)
    }
   
    const ControlHelper = () => {    
        return (
            <CameraControls 
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
            <CoordHelper props={coord} />
        </>
    )
}

export default MainCanvas