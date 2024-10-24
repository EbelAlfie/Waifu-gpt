import vision from '@/assets/vision/Vision_Mondstadt_Anemo.webp'
import Image from "next/image"

const IconButton = () => {
    return (
        <div className="flex flex-col items-center">
            <button className='icon_button'>
            <Image
                src={vision}
                alt="button"
                width={50}
                height={50}
            />
            </button>
            <p className="text_genshin">Alarm</p>
        </div>
    )
}

export default IconButton