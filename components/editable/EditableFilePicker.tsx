import { HTMLProps } from "react";
import { Editable } from "./Editable";


/**
 * Controlled input component which displays an `input[type="file"]` in editing mode, and is invisible in preview mode.
 * 
 * Has no value due to how file inputs function in JS and React.
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