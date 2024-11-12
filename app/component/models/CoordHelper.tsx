import { OrbitControlsChangeEvent } from "@react-three/drei"

export type CoordProps = {
    x?: number,
    y?: number,
    z?: number
}

const CoordHelper = ({props}: {props?: CoordProps | undefined}) => {
    console.log(props)
    return (
        <section className="absolute bottom-0 text_genshin flex-col flex p-5 box_overlay">
            <p>X: {props?.x}</p>
            <p>Y: {props?.y}</p>
            <p>Z: {props?.z}</p>
        </section>
    )
} 

export default CoordHelper