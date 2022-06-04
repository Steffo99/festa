import { HTMLProps } from "react";
import { EditingContext } from "../../contexts/editing";
import { useDefinedContext } from "../../utils/definedContext";
import { FestaMarkdown } from "../extensions/FestaMarkdown";


export function EditableMarkdown({value, ...props}: HTMLProps<HTMLTextAreaElement>) {
    const [editing,] = useDefinedContext(EditingContext)

    return editing ? (
        <textarea value={value} {...props}/>
    ) : (
        <FestaMarkdown markdown={value as string}/>
    )
}