import { ReactNode } from "react"

type FormDateRangeProps = {
    icon: ReactNode,
    start: ReactNode,
    connector: ReactNode,
    end: ReactNode,
}


export function FormDateRange(props: FormDateRangeProps) {
    return (
        <div className="form-daterange">
            <div className="form-daterange-icon">
                {props.icon}
            </div>
            <div className="form-daterange-start">
                {props.start}
            </div>
            <div className="form-daterange-connector">
                {props.connector}
            </div>
            <div className="form-daterange-end">
                {props.end}
            </div>
        </div>
    )
}