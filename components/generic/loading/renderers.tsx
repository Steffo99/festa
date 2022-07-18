import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { memo } from "react";
import { FestaIcon } from "../renderers/fontawesome";
import style from "./renderers.module.css"


/**
 * Props for "loading" renderers, such as {@link LoadingInline} and {@link LoadingMain}.
 */
export type LoadingProps = {
    text?: string
}


/**
 * Inline component displaying an animated loading icon with an optional message displayed on the right.
 * 
 * @see {@link ErrorInline}
 */
export const LoadingInline = memo(({ text }: LoadingProps) => {
    return (
        <span className={classNames(style.loading, style.loadingInline)}>
            <FestaIcon
                icon={faAsterisk}
                spin
                className={style.loadingIcon}
            />
            {!!text && <>
                &nbsp;
                <span className={style.loadingText}>
                    {text}
                </span>
            </>}
        </span>
    )
})
LoadingInline.displayName = "LoadingInline"


/**
 * Block component displaying a big loading icon with an optional message displayed below.
 * 
 * @see {@link ErrorMain}
 */
export const LoadingMain = memo(({ text }: LoadingProps) => {
    return (
        <div className={classNames(style.loading, style.loadingMain)}>
            <FestaIcon
                icon={faAsterisk}
                spin
                className={style.loadingIcon}
            />
            {!!text &&
                <p className={style.loadingText}>
                    {text}
                </p>
            }
        </div>
    )
})
LoadingMain.displayName = "LoadingMain"