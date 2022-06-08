import { HTMLProps } from "react";
import { EditingContext } from "./EditingContext";
import { useDefinedContext } from "../../utils/definedContext";
import { Postcard } from "../postcard/Postcard";


/**
 * Controlled input component which displays an `input[type="file"]` in editing mode, and is invisible in preview mode.
 * 
 * As a side effect, it changes the {@link Postcard} to the input file when it's rendered.
 */
export function EditablePostcard({value, ...props}: HTMLProps<HTMLInputElement> & {value: string | undefined}) {
    const [editing,] = useDefinedContext(EditingContext)

    return <>
        {editing ? 
            <input type="file" value={undefined} {...props}/>
        : null}
        <Postcard src={value}/>
    </>
}