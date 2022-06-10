import classNames from "classnames"
import { HTMLProps, memo } from "react"


export type FormFromToProps = HTMLProps<HTMLDivElement> & {
    preview: boolean,
}

export const FormFromTo = memo((props: FormFromToProps) => {
    return (
        <div
            {...props}
            className={classNames(
                "form-fromto",
                props.preview ? "form-fromto-preview" : null,
                props.className
            )}
        />
    )
})


export type FormFromToPartProps = HTMLProps<HTMLDivElement> & {
    part: "icon" | "start" | "connector" | "end"
}

export const FormFromToPart = memo((props: FormFromToPartProps) => {
    return (
        <div
            {...props}
            className={classNames(
                `form-fromto-${props.part}`,
                props.className,
            )}
        />
    )
})
