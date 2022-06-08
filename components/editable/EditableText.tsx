import { HTMLProps } from "react";
import { Editable } from "./Editable";


/**
 * Controlled input component which displays an `input[type="text"]` in editing mode, and a `span` displaying the input in preview mode.
 */
export function EditableText(props: HTMLProps<HTMLInputElement> & { value: string }) {
    return (
        <Editable
            editing={
                <input type="text" {...props} />
            }
            preview={
                <span>{props.value}</span>
            }
        />
    )
}