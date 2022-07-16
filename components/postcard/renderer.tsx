import { default as classNames } from "classnames"
import style from "./renderer.module.css"
import Image, { ImageProps } from "next/image"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext, PostcardVisibility } from "./base"


export function PostcardRenderer(props: Partial<ImageProps>) {
    const { src, visibility } = useDefinedContext(PostcardContext)

    return (
        <Image
            src={src}
            width={"100vw"}
            height={"100vh"}
            layout="raw"
            alt=""
            {...props}
            className={classNames(
                style.postcard,
                visibility === PostcardVisibility.BACKGROUND ? style.postcardBackground : null,
                visibility === PostcardVisibility.FOREGROUND ? style.postcardForeground : null,
            )}
        />
    )
}