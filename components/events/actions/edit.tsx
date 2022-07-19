import { Event } from "@prisma/client"
import { useMemo } from "react"
import { KeyedMutator } from "swr"
import { ViewContent } from "../../generic/views/content"


export type EventsActionViewProps = {
    data: Event,
    mutate: KeyedMutator<Event>,
}


export const EventsActionEdit = ({ data, mutate }: EventsActionViewProps) => {
    return (
        <ViewContent
            title={
                useMemo(
                    () => (
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => mutate({ ...data, name: e.target.value }, { revalidate: false })}
                        />
                    ),
                    [data.name]
                )
            }
            content={<>
                {useMemo(
                    () => (
                        <textarea
                            rows={12}
                            value={data.description}
                            onChange={e => mutate({ ...data, description: e.target.value }, { revalidate: false })}
                        />
                    ),
                    [data.description]
                )}
            </>}
        />
    )
}
