import { useEffect } from "react"
import { PostcardContext } from "./PostcardContext"
import { useDefinedContext } from "../../utils/definedContext"
import { StaticImageData } from "next/image"

type PostcardProps = {
    src?: string | StaticImageData
}

export function Postcard({src}: PostcardProps) {
    const {setPostcard} = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            if(src) {
                if(typeof src === "object") {
                    setPostcard(src.src)
                }
                else {
                    setPostcard(src)
                }
            }
        },
        [src, setPostcard]
    )

    return null
}
