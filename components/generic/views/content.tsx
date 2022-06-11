import { memo, ReactNode } from "react"
import style from "./content.module.css"


export type ViewContentProps = {
    title: ReactNode
    content: ReactNode
}

/**
 * A view which displays a title and below it some miscellaneous text content.
 */
export const ViewContent = memo((props: ViewContentProps) => {
    return (
        <main className={style.viewContent}>
            <h2 className={style.viewContentTitle}>
                {props.title}
            </h2>
            <div className={style.viewContentContent}>
                {props.content}
            </div>
        </main>
    )
})
