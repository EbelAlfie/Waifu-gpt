import { Cloud, Clouds } from "@react-three/drei"
import { Color } from "@react-three/fiber"

type CloudProp = {
    color: Color | string | number
}

const CharacterFog = (props: CloudProp) => {
    return (
        <>
            <mesh >
                <Cloud 
                    color={props.color}
                />
            </mesh>
        </>
    )
}

export default CharacterFog