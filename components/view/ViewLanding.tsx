import { ReactNode } from "react"

type ViewLandingProps = {
    title: ReactNode
    subtitle: ReactNode
    actions: ReactNode
}


export function ViewLanding(props: ViewLandingProps) {
    return (
        <main className="view-landing">
            <hgroup className="view-landing-titles">
                <h1 className="view-landing-titles-title">
                    {props.title}
                </h1>
                <h2 className="view-landing-titles-subtitle">
                    {props.subtitle}
                </h2>
            </hgroup>
            <div className="view-landing-actions">
                {props.actions}
            </div>
        </main>
    )
}