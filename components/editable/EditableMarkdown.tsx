import { HTMLProps } from "react";
import { FestaMarkdown } from "../extensions/FestaMarkdown";
import { Editable } from "./Editable";

/**
 * Controlled input component which displays a `textarea` in editing mode, and renders the input in Markdown using {@link FestaMarkdown} in preview mode.
 */
export function EditableMarkdown(props: HTMLProps<HTMLTextAreaElement> & { value: string }) {
    return (
        <Editable
            editing={
                <textarea {...props} />
            }
            preview={
                <FestaMarkdown markdown={props.value} />
            }
        />
    )
}