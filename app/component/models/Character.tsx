"use client"
import { useLoader } from '@react-three/fiber'
import { FBXLoader, GLTFLoader } from 'three/examples/jsm/Addons.js'

const model = '/assets/models/char.fbx'

const Character = () => {
    const object = useLoader(FBXLoader, model)
    return <primitive object={object} />
}

export default Character