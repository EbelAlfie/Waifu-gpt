"use client"
import { useFBX } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { FBXLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

const model = '/assets/models/char.fbx'

const Character = () => {
    const object = useFBX(model)
    return <primitive 
        object={object} 
        scale={[0.04, 0.04, 0.04]}
    />
}

export default Character