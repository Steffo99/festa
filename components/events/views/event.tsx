import { ReactNode } from "react"
import style from "./event.module.css"


export type ViewEventProps = {
    title: ReactNode,
    postcard: ReactNode,
    description: ReactNode,
    daterange: ReactNode,
}


/**
 * View intended for use in the event details page.
 */
export const ViewEvent = (props: ViewEventProps) => {
    return (
        <main className={style.viewEvent}>
            <h1 className={style.viewEventTitle}>
                {props.title}
            </h1>
            <div className={style.viewEventPostcard}>
                {props.postcard}
            </div>
            <div className={style.viewEventDescription}>
                {props.description}
            </div>
            <div className={style.viewEventDaterange}>
                {props.daterange}
            </div>
        </main>
    )
}