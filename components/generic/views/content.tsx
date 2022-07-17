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
            <h1 className={style.viewContentTitle}>
                {props.title}
            </h1>
            <div className={style.viewContentContent}>
                {props.content}
            </div>
        </main>
    )
})
ViewContent.displayName = "ViewContent"