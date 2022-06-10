import { HTMLProps } from "react";
import { BaseEditable } from "./BaseEditable";


/**
 * Controlled input component which displays an `input[type="text"]` in editing mode, and a `span` displaying the input in preview mode.
 */
export function EditableText(props: HTMLProps<HTMLInputElement> & { value: string }) {
    return (
        <BaseEditable
            editing={
                <input type="text" {...props} />
            }
            preview={
                <span>{props.value}</span>
            }
        />
    )
}