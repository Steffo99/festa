import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "../renderers/fontawesome";
import { default as classNames } from "classnames"
import style from "./renderers.module.css"
import mood from "../../../styles/mood.module.css"
import { ComponentPropsWithoutRef, memo } from "react";
import { AxiosError } from "axios";


/**
 * Props of {@link ErrorTrace}.
 */
type ErrorTraceProps = ComponentPropsWithoutRef<"code"> & {
    /**
     * The error to render the stack trace of.
     */
    error: Error,

    /**
     * Whether error messages in JSON format should be prettified or not.
     */
    prettify: boolean,
}


/**
 * Component rendering the details of an {@link Error}.
 * 
 * Not to use by itself; should be used to display the error in other error renderers.
 */
const ErrorTrace = memo(({ error, prettify, ...props }: ErrorTraceProps) => {
    if (error instanceof AxiosError) {
        if (error.response) {
            if (error.response.data) {
                const json = JSON.stringify(error.response.data, undefined, prettify ? 4 : undefined).replaceAll("\\n", "\n")

                return (
                    <code {...props}>
                        <span>
                            <b>API {error.response.status}</b>
                            :&nbsp;
                        </span>
                        <span>
                            {json}
                        </span>
                    </code>
                )
            }

            return (
                <code {...props}>
                    <span>
                        <b>HTTP {error.response.status}</b>
                        :&nbsp;
                    </span>
                    <span>
                        {error.message}
                    </span>
                </code>
            )
        }

        return (
            <code {...props}>
                <span>
                    <b>{error.code}</b>
                    :&nbsp;
                </span>
                <span>
                    {error.message}
                </span>
            </code>
        )
    }

    return (
        <code {...props}>
            <span>
                <b>{error.name}</b>
                :&nbsp;
            </span>
            <span>
                {error.message}
            </span>
        </code>
    )
})
ErrorTrace.displayName = "ErrorTrace"


/**
 * Props for "error" renderers.
 */
export type ErrorProps = {
    error: Error,
    text?: string
}


/**
 * Inline component for rendering errors.
 * 
 * It displays an error {@link FestaIcon}, followed by some optional text, and finally the {@link ErrorTrace}.
 */
export const ErrorInline = memo(({ error, text }: ErrorProps) => {
    return (
        <span className={classNames(mood.negative, style.error, style.errorInline)}>
            <FestaIcon icon={faCircleExclamation} className={style.errorIcon} />
            {!!text && <>
                &nbsp;
                <span className={style.errorText}>
                    {text}
                </span>
                &nbsp;
            </>}
            <ErrorTrace error={error} prettify={false} className={style.errorTrace} />
        </span>
    )
})
ErrorInline.displayName = "ErrorInline"


/**
 * Block component for rendering errors.
 * 
 * It displays an inline error {@link FestaIcon}, followed by some **required** text, with the {@link ErrorTrace} below.
 */
export const ErrorBlock = memo(({ error, text }: ErrorProps & { text: string }) => {
    return (
        <div className={classNames(mood.negative, style.error, style.errorBlock)}>
            <p>
                <FestaIcon icon={faCircleExclamation} className={style.errorIcon} />
                &nbsp;
                <span className={style.errorText}>
                    {text}
                </span>
            </p>
            <pre>
                <ErrorTrace error={error} prettify={false} className={style.errorTrace} />
            </pre>
        </div>
    )
})
ErrorBlock.displayName = "ErrorBlock"


/**
 * Block component for rendering errors at the center of the page.
 * 
 * It displays an inline error {@link FestaIcon}, followed by some **required** text, with the {@link ErrorTrace} below.
 */
export const ErrorMain = memo(({ error, text }: ErrorProps & { text: string }) => {
    return (
        <div className={classNames(mood.negative, style.error, style.errorMain)}>
            <FestaIcon icon={faCircleExclamation} className={style.errorIcon} />
            <p className={style.errorText}>
                {text}
            </p>
            <pre>
                <ErrorTrace error={error} prettify={false} className={style.errorTrace} />
            </pre>
        </div>
    )
})
ErrorMain.displayName = "ErrorMain"
