import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "../renderers/fontawesome";
import { default as classNames } from "classnames"
import style from "./renderers.module.css"
import { memo } from "react";
import { AxiosError } from "axios";


export type ErrorTraceProps = {
    error: Error,
    inline: boolean,
}


export const ErrorTrace = memo((props: ErrorTraceProps) => {
    if (props.error instanceof AxiosError) {
        if (props.error.response) {
            if (props.error.response.data) {
                const json = JSON.stringify(props.error.response.data, undefined, props.inline ? undefined : 4).replaceAll("\\n", "\n")

                return (
                    <code>
                        <b>API {props.error.response.status}</b>
                        :&nbsp;
                        {json}
                    </code>
                )
            }

            return (
                <code>
                    <b>HTTP {props.error.response.status}</b>
                    :&nbsp;
                    {props.error.message}
                </code>
            )
        }

        return (
            <code>
                <b>{props.error.code}</b>
                :&nbsp;
                {props.error.message}
            </code>
        )
    }

    return (
        <code>
            <b>{props.error.name}</b>
            :&nbsp;
            {props.error.message}
        </code>
    )
})
ErrorTrace.displayName = "ErrorTrace"


export type ErrorInlineProps = {
    error: Error,
    text?: string
}

/**
 * Component rendering a `span` element containing an error passed to it as props.
 * 
 * May or may not include some text to display to the user.
 */
export const ErrorInline = memo((props: ErrorInlineProps) => {
    return (
        <span className={classNames("negative", style.error, style.errorInline)}>
            <FestaIcon icon={faCircleExclamation} />
            &nbsp;
            {props.text ?
                <>
                    <span>
                        {props.text}
                    </span>
                    &nbsp;
                </>
                : null}
            <ErrorTrace error={props.error} inline={true} />
        </span>
    )
})
ErrorInline.displayName = "ErrorInline"


export type ErrorBlockProps = {
    error: Error,
    text: string
}

/**
 * Component rendering a `div` element containing an error passed to it as props.
 * 
 * Must include some text to display to the user.
 */
export const ErrorBlock = memo((props: ErrorBlockProps) => {
    return (
        <div className={classNames("negative", style.error, style.errorBlock)}>
            <p>
                <FestaIcon icon={faCircleExclamation} />
                &nbsp;
                <span>
                    {props.text}
                </span>
            </p>
            <pre>
                <ErrorTrace error={props.error} inline={false} />
            </pre>
        </div>
    )
})
ErrorBlock.displayName = "ErrorBlock"