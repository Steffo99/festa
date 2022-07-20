import { Event } from "@prisma/client"
import { memo } from "react"
import { FestaMarkdownRenderer } from "../../generic/renderers/markdown"
import { ViewContent } from "../../generic/views/content"


export type EventsActionViewProps = {
    data: Event,
}


export const EventsActionView = memo(({ data }: EventsActionViewProps) => {
    return (
        <form>
            <ViewContent
                title={<div style={{ padding: "10px" }}>
                    {data.name}
                </div>}
                content={<div>
                    <FestaMarkdownRenderer code={data.description} />
                </div>}
            />
        </form>
    )
})
EventsActionView.displayName = "EventsActionView"