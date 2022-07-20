import { default as classNames } from "classnames"
import style from "./renderer.module.css"
import Image, { ImageProps } from "next/future/image"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext, PostcardVisibility } from "./base"


export function PostcardRenderer(props: Partial<ImageProps>) {
    const { src, visibility } = useDefinedContext(PostcardContext)

    // Hehe, dirty hack that might actually work
    const width = typeof window === "undefined" ? undefined : window.innerWidth
    const height = typeof window === "undefined" ? undefined : window.innerHeight

    return (
        <Image
            src={src}
            alt=""
            priority={true}
            {...props}
            width={width}
            height={height}
            className={classNames(
                style.postcard,
                visibility === PostcardVisibility.BACKGROUND ? style.postcardBackground : null,
                visibility === PostcardVisibility.FOREGROUND ? style.postcardForeground : null,
            )}
        />
    )
}