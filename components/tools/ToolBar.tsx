import {default as classNames} from "classnames"
import { ReactNode } from "react"

type ToolBarProps = {
    vertical: "top" | "bottom" | "vadapt",
    horizontal: "left" | "right",
    children: ReactNode,
}

export function ToolBar({vertical, horizontal, children}: ToolBarProps) {
    return (
        <div className={classNames("toolbar", `toolbar-${vertical}`, `toolbar-${horizontal}`)} role="toolbar">
            {children}
        </div>
    )
}