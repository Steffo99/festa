import { HTMLProps } from "react";
import { FestaMarkdown } from "../extensions/FestaMarkdown";
import { BaseEditable } from "./BaseEditable";

/**
 * Controlled input component which displays a `textarea` in editing mode, and renders the input in Markdown using {@link FestaMarkdown} in preview mode.
 */
export function EditableMarkdown(props: HTMLProps<HTMLTextAreaElement> & { value: string }) {
    return (
        <BaseEditable
            editing={
                <textarea {...props} />
            }
            preview={
                <FestaMarkdown markdown={props.value} />
            }
        />
    )
}