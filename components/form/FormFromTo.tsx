import classNames from "classnames"
import { ReactNode } from "react"

type FormDateRangeProps = {
    preview: boolean,
    icon: ReactNode,
    start: ReactNode,
    connector: ReactNode,
    end: ReactNode,
}


export function FormFromTo(props: FormDateRangeProps) {
    return (
        <div className={classNames({
            "form-fromto": true,
            "form-fromto-preview": props.preview,
        })}>
            <div className="form-fromto-icon">
                {props.icon}
            </div>
            <div className="form-fromto-start">
                {props.start}
            </div>
            <div className="form-fromto-connector">
                {props.connector}
            </div>
            <div className="form-fromto-end">
                {props.end}
            </div>
        </div>
    )
}