import { memo, ReactNode } from "react"
import style from "./landing.module.css"


export type ViewLandingProps = {
    title: ReactNode
    subtitle: ReactNode
    actions: ReactNode
}


/**
 * A view which displays a *really* big title and subtitle, with some actions the user can take below.
 * 
 * Intended for the root / landing page of the app.
 */
export const ViewLanding = memo((props: ViewLandingProps) => {
    return (
        <main className={style.viewLanding}>
            <hgroup className={style.viewLandingTitles}>
                <h1 className={style.viewLandingTitlesTitle}>
                    {props.title}
                </h1>
                <h2 className={style.viewLandingTitlesSubtitle}>
                    {props.subtitle}
                </h2>
            </hgroup>
            <div className={style.viewLandingActions}>
                {props.actions}
            </div>
        </main>
    )
})
