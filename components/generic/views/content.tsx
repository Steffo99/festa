import { memo, ReactNode } from "react"
import style from "./content.module.css"


export type ViewContentProps = {
    content: ReactNode
}

/**
 * A view which displays a title and below it some miscellaneous text content.
 */
export const ViewContent = memo((props: ViewContentProps) => {
    return (
        <main className={style.viewContent}>
            {props.content}
        </main>
    )
})
ViewContent.displayName = "ViewContent"