import { ReactNode } from "react"

type ViewNoticeProps = {
    notice: ReactNode
}


export function ViewNotice(props: ViewNoticeProps) {
    return (
        <main className="view-notice">
            {props.notice}
        </main>
    )
}