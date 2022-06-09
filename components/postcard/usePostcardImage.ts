import { useEffect } from "react"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext } from "./PostcardContext"

export function usePostcardImage(image: string) {
    const { setImage } = useDefinedContext(PostcardContext)

    useEffect(
        () => {
            setImage(image)
        },
        [image]
    )
}