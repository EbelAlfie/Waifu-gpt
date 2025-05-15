"use client";

import { Canvas, } from "@react-three/fiber";
import { Color, PerspectiveCamera, Scene, Vector3 } from "three";
import InfoBackground from "./InfoBackground";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CoordHelper, { CoordProps } from "./3dmodels/CoordHelper";
import { Theme } from "../hooks/useTheme";

const MainCanvas = () => {
    const theme = useContext(Theme)
    const [coord, setCoord] = useState<CoordProps>()
    const controllRef = useRef<CameraControls>(null)

    const camera = useMemo(() => {
        const cam = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        cam.position.set(0, 4, 11)
        cam.zoom = 1.5
        return cam
    }, []) 

    const scene = useMemo(() => {
        const scene = new Scene()
	    scene.background = new Color(theme.skyColor)
        return scene
    }, []) 

    useEffect(() => {
        if (controllRef.current) {
            controllRef.current.setTarget(0, 4, 0)
        }
    }, [controllRef.current])

    const updateCurrentCoord = () => {
        const position = new Vector3()
        controllRef.current && controllRef.current.getPosition(position)
        setCoord({
            x: position.x,
            y: position.y,
            z: position.z
        })
    }

    const CanvasContent = useMemo(() => 
        <Canvas
            shadows = {true}
            scene = {scene}
            camera = {camera}
        > 
            <CameraControls 
                ref={controllRef}
                camera={camera}
                onChange={updateCurrentCoord}
            />  

            <axesHelper scale={10}/>
            <InfoBackground />
            {/* <NewFog 
                color={0xffffff}
                near={1}
                far={10}
            /> */}
        </Canvas>
    , [])

    return (
        <>
            {CanvasContent}     
            <CoordHelper props={coord}/>
        </>
    )
}

export default MainCanvas