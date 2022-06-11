import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { FestaIcon } from "../renderers/fontawesome";


export type LoadingTextInlineProps = {
    text: string
}

/**
 * Component displaying an animated loading message for the user.
 */
export const LoadingTextInline = memo((props: LoadingTextInlineProps) => {
    return (
        <span>
            <FestaIcon icon={faAsterisk} spin />
            &nbsp;
            {props.text}
        </span>
    )
})
