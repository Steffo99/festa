import classNames from "classnames"
import { HTMLProps, ReactNode } from "react"

type FormMonorowProps = {
    children: ReactNode
}

export function FormMonorow(props: FormMonorowProps & HTMLProps<HTMLFormElement>) {
    return (
        <form {...props} className={classNames("form-monorow", props.className)}>
            {props.children}
        </form>
    )
}