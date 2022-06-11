import { default as classNames } from "classnames"
import { ComponentPropsWithoutRef, memo } from "react"
import style from "./tool.module.css"


export type ToolProps = ComponentPropsWithoutRef<"button">


/**
 * A single tool button displayed in the toolbar.
 */
export const Tool = memo((props: ToolProps) => {
    return (
        <button
            {...props}
            className={classNames(
                style.toolbarTool,
                props.className,
            )}
        />
    )
})
