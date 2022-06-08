import { HTMLProps } from "react";
import { EditingContext } from "../../contexts/editing";
import { useDefinedContext } from "../../utils/definedContext";
import { Postcard } from "../postcard/Postcard";


export function EditablePostcard({value, ...props}: HTMLProps<HTMLInputElement> & {value: string | undefined}) {
    const [editing,] = useDefinedContext(EditingContext)

    return <>
        {editing ? 
            <input type="file" value={undefined} {...props}/>
        : null}
        <Postcard src={value}/>
    </>
}