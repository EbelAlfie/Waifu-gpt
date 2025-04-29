"use client"
import { useFBX } from '@react-three/drei'
import { useCharacterContext } from '../../hooks/CharacterData'

const Character = () => {
    const character = useCharacterContext()

    const object = useFBX(character.modelPath)
    return <primitive 
        object={object} 
        scale={[0.04, 0.04, 0.04]}
    />
}

export default Character