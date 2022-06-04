import { ReactNode } from "react"

type ViewContentProps = {
    title: ReactNode
    content: ReactNode
}


export function ViewContent(props: ViewContentProps) {
    return (
        <main className="view-content">
            <h1 className="view-content-title">
                {props.title}
            </h1>
            <div className="view-content-content">
                {props.content}
            </div>
        </main>
    )
}