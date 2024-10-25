import { OrbitControlsChangeEvent } from "@react-three/drei"

const CoordHelper = ({props}: {props: OrbitControlsChangeEvent | undefined}) => {
    console.log(props)
    return (
        <section className="absolute bottom-0 text_genshin flex-col flex p-5 box_overlay">
            <p>X: {props?.target?.object?.position?.x}</p>
            <p>Y: {props?.target?.object?.position?.y}</p>
            <p>Z: {props?.target?.object?.position?.z}</p>
        </section>
    )
} 

export default CoordHelper