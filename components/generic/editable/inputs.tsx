import { ComponentPropsWithoutRef, ReactNode } from "react"
import { FestaMoment } from "../renderers/datetime"
import { FestaMarkdownRenderer } from "../renderers/markdown"
import { EditingModeBranch } from "./base"
import style from "./inputs.module.css"


type TextInputProps = ComponentPropsWithoutRef<"input"> & { value: string }
type FileInputProps = ComponentPropsWithoutRef<"input"> & { value?: undefined }
type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & { value: string }


/**
 * Controlled input component which displays an `input[type="text"]` in edit mode, and a `span` displaying the input in view mode.
 */
export const EditableText = (props: TextInputProps) => {
    return (
        <EditingModeBranch
            edit={
                <input type="text" {...props} />
            }
            view={
                <div className={style.editableTextView}>
                    {props.value}
                </div>
            }
        />
    )
}


/**
 * Controlled input component which displays an `input[type="file"]` in edit mode, and is invisible in view mode.
 * 
 * Has no value due to how file inputs function in JS and React.
 */
export const EditableFilePicker = (props: FileInputProps) => {
    return (
        <EditingModeBranch
            edit={
                <input type="file" {...props} />
            }
            view={
                <></>
            }
        />
    )
}


/**
 * Controlled input component which displays a `textarea` in edit mode, and renders the input in Markdown using {@link FestaMarkdownRenderer} in view mode.
 */
export const EditableMarkdown = (props: TextAreaProps) => {
    return (
        <EditingModeBranch
            edit={
                <textarea
                    className={style.editableMarkdownEdit}
                    rows={12}
                    {...props}
                />
            }
            view={
                <FestaMarkdownRenderer code={props.value} />
            }
        />
    )
}


/**
 * Controlled input component which displays a `input[type="datetime-local"]` in edit mode, and renders the selected datetime using {@link FestaMoment} in view mode.
 */
export const EditableDateTimeLocal = (props: TextInputProps) => {
    return (
        <EditingModeBranch
            edit={
                <input
                    type="datetime-local"
                    {...props}
                />
            }
            view={
                <div>
                    <FestaMoment date={new Date(props.value)} />
                </div>
            }
        />
    )
}