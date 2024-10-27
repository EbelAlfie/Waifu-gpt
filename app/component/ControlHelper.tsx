import { CameraControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const ControlHelper = () => {    
    return (
        <CameraControls 
            makeDefault 
        />
    )
}

export default ControlHelper