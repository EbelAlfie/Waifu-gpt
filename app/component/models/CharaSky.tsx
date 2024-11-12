import { BackSide, ColorRepresentation} from "three"

type SkyProps = {
    color?: ColorRepresentation
    radius: number
}

const CharaSky = ({radius = 1.5, color = 0xffffff, ...props}: SkyProps) => {
    return (
        <>
            <mesh
                scale={100}
            >
                <sphereGeometry args={[radius]} />
                <meshBasicMaterial 
                    side={BackSide}
                    color={color}
                    fog={false}
                />
            </mesh>
        </>
    )
}

export default CharaSky