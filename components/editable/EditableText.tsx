import { HTMLProps } from "react";
import { EditingContext } from "./EditingContext";
import { useDefinedContext } from "../../utils/definedContext";


/**
 * Controlled input component which displays an `input[type="text"]` in editing mode, and a `span` displaying the input in preview mode.
 */
export function EditableText(props: HTMLProps<HTMLInputElement> & {value: string}) {
    const [editing,] = useDefinedContext(EditingContext)

    return editing ? (
        <input type="text" {...props}/>
    ) : (
        <span>{props.value}</span>
    )
}