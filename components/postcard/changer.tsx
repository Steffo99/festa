import { useEffect } from "react"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext, PostcardSource } from "./base"


/**
 * Use the passed src as {@link PostcardSource} for the wrapping {@link PostcardContext}.
 */
export function usePostcardImage(src: PostcardSource) {
    const { setSrc } = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            setSrc(src)
        },
        [src, setSrc]
    )
}


export type PostcardProps = {
    src: PostcardSource
}


/**
 * The same as {@link usePostcardImage}, but as a component rendering `null`.
 */
export function Postcard(props: PostcardProps) {
    usePostcardImage(props.src)

    return null
}
