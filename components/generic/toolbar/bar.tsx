import { default as classNames } from "classnames"
import { ComponentPropsWithoutRef, memo, ReactNode } from "react"
import style from "./base.module.css"


export type ToolBarProps = ComponentPropsWithoutRef<"div"> & {
    /**
     * The vertical alignment of the toolbar.
     * 
     * - `top` places it on top of the page
     * - `bottom` places it at the bottom of the page
     * - `vadapt` places it on top on computers and at the bottom on smartphones
     */
    vertical: "top" | "bottom" | "vadapt",

    /**
     * The horizontal alignment of the toolbar.
     * 
     * - `left` places it on the left of the webpage
     * - `right` places it on the right of the webpage
     */
    horizontal: "left" | "right",

    /**
     * The buttons to be displayed in the toolbar.
     */
    children: ReactNode,
}


/**
 * Toolbar containing many buttons, displayed in a corner of the screen.
 */
export const ToolBar = memo((props: ToolBarProps) => {
    return (
        <div
            role="toolbar"
            {...props}
            className={classNames(
                "toolbar",
                props.vertical === "top" ? style.toolbarTop : null,
                props.vertical === "bottom" ? style.toolbarBottom : null,
                props.vertical === "vadapt" ? style.toolbarVadapt : null,
                props.horizontal === "left" ? style.toolbarLeft : null,
                props.horizontal === "right" ? style.toolbarRight : null,
                props.className,
            )}
        />
    )
})
