import { HTMLProps } from "react";
import { Editable } from "./Editable";


/**
 * Controlled input component which displays an `input[type="file"]` in editing mode, and is invisible in preview mode.
 * 
 * Value is the file's [fakepath](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value), as a string.
 */
export function EditableFilePicker(props: HTMLProps<HTMLInputElement> & { value?: undefined }) {
    return (
        <Editable
            editing={
                <input type="file" {...props} />
            }
            preview={<></>}
        />
    )
}