import { default as classNames } from "classnames";
import { ComponentPropsWithoutRef } from "react";
import style from "./monorow.module.css"


/**
 * A layout to display something in a single line, usually a form or a group of inputs.
 */
export function LayoutMonorow(props: ComponentPropsWithoutRef<"div">) {
    return (
        <div
            {...props}
            className={classNames(style.layoutMonorow, props.className)}
        />
    )
}
