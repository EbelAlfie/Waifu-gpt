"use client"
import { useFBX } from '@react-three/drei'
import { useContext } from 'react'
import { GlobalCharacterData } from '../../hooks/CharacterData'

const Character = () => {
    const character = useContext(GlobalCharacterData)

    const object = useFBX(character.modelPath)
    return <primitive 
        object={object} 
        scale={[0.04, 0.04, 0.04]}
    />
}

export default Character