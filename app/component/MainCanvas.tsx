"use client";

import { Canvas, } from "@react-three/fiber";
import { Color, Scene, Vector3 } from "three";
import InfoBackground from "./InfoBackground";
import { CameraControls } from "@react-three/drei";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CoordHelper, { CoordProps } from "./3dmodels/CoordHelper";
import { Theme } from "../hooks/useTheme";

const debug = false

const MainCanvas = () => {
    const theme = useContext(Theme)
    const [coord, setCoord] = useState<CoordProps>()
    const controllRef = useRef<CameraControls>(null)

    const scene = useMemo(() => {
        const scene = new Scene()
	    scene.background = new Color(theme.skyColor)
        return scene
    }, []) 

    useEffect(() => {
        controllRef.current && controllRef.current.setTarget(0, 4, 0)
    }, [controllRef.current])

    const updateCurrentCoord = () => {
        if (!debug) return 
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
            camera = {
                {fov: 75, near: 0.1, far: 1000, position: [0, 4, 11], zoom: 1.5}
            }
        > 
            <CameraControls 
                ref={controllRef}
                onChange={updateCurrentCoord}
                maxDistance={11}
                minDistance={2}
                maxPolarAngle={Math.PI - 0.5}
                minPolarAngle={1}
                maxAzimuthAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
            />  

            { debug && <axesHelper scale={10}/> }
            <InfoBackground />
        </Canvas>
    , [])

    return (
        <>
            {CanvasContent}
            { debug && <CoordHelper props={coord}/> }
        </>
    )
}

export default MainCanvas