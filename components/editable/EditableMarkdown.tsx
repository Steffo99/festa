import { HTMLProps } from "react";
import { EditingContext } from "./EditingContext";
import { useDefinedContext } from "../../utils/definedContext";
import { FestaMarkdown } from "../extensions/FestaMarkdown";

/**
 * Controlled input component which displays a `textarea` in editing mode, and renders the input in Markdown using {@link FestaMarkdown} in preview mode.
 */
export function EditableMarkdown({value, ...props}: HTMLProps<HTMLTextAreaElement>) {
    const [editing,] = useDefinedContext(EditingContext)

    return editing ? (
        <textarea value={value} {...props}/>
    ) : (
        <FestaMarkdown markdown={value as string}/>
    )
}