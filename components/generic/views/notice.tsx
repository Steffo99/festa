import { memo, ReactNode } from "react"
import style from "./notice.module.css"


export type ViewNoticeProps = {
    notice: ReactNode
}


/**
 * A view which displays its contents centered on the screen.
 * 
 * Intended for errors or other important alerts.
 */
export const ViewNotice = memo((props: ViewNoticeProps) => {
    return (
        <main className={style.viewNotice}>
            {props.notice}
        </main>
    )
})
ViewNotice.displayName = "ViewNotice"
