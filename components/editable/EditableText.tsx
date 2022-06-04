import { HTMLProps } from "react";
import { EditingContext } from "../../contexts/editing";
import { useDefinedContext } from "../../utils/definedContext";


export function EditableText({value, ...props}: HTMLProps<HTMLInputElement>) {
    const [editing,] = useDefinedContext(EditingContext)

    return editing ? (
        <input type="text" value={value} {...props}/>
    ) : (
        <span>{value}</span>
    )
}