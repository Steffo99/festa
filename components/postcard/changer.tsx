import { StaticImageData } from "next/image"
import { useEffect } from "react"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext, PostcardSource } from "./base"


/**
 * Use the passed src as {@link PostcardSource} for the wrapping {@link PostcardContext}.
 */
export function usePostcardImage(src: PostcardSource | StaticImageData) {
    const { changePostcard } = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            if (typeof src === "string") {
                changePostcard(src)
            }
            else {
                changePostcard(src.src)
            }
        },
        [src, changePostcard]
    )
}


/**
 * The same as {@link usePostcardImage}, but as a component rendering `null`.
 */
export function Postcard({ src }: { src: PostcardSource | StaticImageData }): null {
    usePostcardImage(src)
    return null
}
