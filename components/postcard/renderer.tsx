import { default as classNames } from "classnames"
import style from "./renderer.module.css"
import { useDefinedContext } from "../../utils/definedContext"
import { PostcardContext, PostcardSource, PostcardVisibility } from "./base"
import { LegacyRef, useEffect, useRef } from "react"


export function PostcardRenderer() {
    const { previousSrc, currentSrc, visibility } = useDefinedContext(PostcardContext)
    const currentRef: LegacyRef<HTMLImageElement> = useRef(null)

    useEffect(
        () => {
            if (currentRef.current) {
                currentRef.current.animate(
                    [
                        { opacity: 0 },
                        { opacity: 1 },
                    ],
                    {
                        duration: 1000
                    }
                )
            }
        },
        [currentRef, currentSrc]
    )

    return <>
        <img
            src={previousSrc}
            alt=""
            className={classNames(
                style.postcard,
                style.postcardPrevious,
                visibility === PostcardVisibility.BACKGROUND ? style.postcardBackground : null,
                visibility === PostcardVisibility.FOREGROUND ? style.postcardForeground : null,
            )}
        />
        <img
            src={currentSrc}
            alt=""
            ref={currentRef}
            className={classNames(
                style.postcard,
                style.postcardCurrent,
                visibility === PostcardVisibility.BACKGROUND ? style.postcardBackground : null,
                visibility === PostcardVisibility.FOREGROUND ? style.postcardForeground : null,
            )}
        />
    </>
}