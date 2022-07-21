import { Event } from "@prisma/client"
import { memo } from "react"
import { FestaMarkdownRenderer } from "../../generic/renderers/markdown"
import { ViewContent } from "../../generic/views/content"
import style from "./view.module.css"


export type EventsActionViewProps = {
    data: Event,
}


export const EventsActionView = memo(({ data }: EventsActionViewProps) => {
    return (
        <form>
            <ViewContent
                content={<>
                    <h1 className={style.padAsInput}>
                        {data.name}
                    </h1>
                    <FestaMarkdownRenderer
                        className={style.padAsInput}
                        code={data.description}
                    />
                </>}
            />
        </form>
    )
})
EventsActionView.displayName = "EventsActionView"