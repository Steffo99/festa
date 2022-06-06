import { ReactNode } from "react"
import { FormDateRange } from "../FormDateRange"

type ViewEventProps = {
    title: ReactNode,
    postcard: ReactNode,
    description: ReactNode,
    datetime: ReactNode,
}


export function ViewEvent(props: ViewEventProps) {
    return (
        <main className="view-event">
            <h1 className="view-event-title">
                {props.title}
            </h1>
            <div className="view-event-postcard">
                {props.postcard}
            </div>
            <div className="view-event-description">
                {props.description}
            </div>
            <FormDateRange 
                className="view-event-daterange"
            />
        </main>
    )
}