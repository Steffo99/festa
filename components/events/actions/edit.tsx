import { Event } from "@prisma/client"
import { Dispatch, useMemo } from "react"
import { KeyedMutator } from "swr"
import { UsePromise } from "../../generic/loading/promise"
import { ViewContent } from "../../generic/views/content"


export type EventsActionViewProps = {
    data: Event,
    mutate: KeyedMutator<Event>,
    save: UsePromise<void, void>,
    setEditing: Dispatch<boolean>,
}


export const EventsActionEdit = ({ data, mutate, save, setEditing }: EventsActionViewProps) => {
    const name = data.name
    const description = data.description

    return (
        <form onSubmit={e => {
            e.preventDefault()
            save.run()
            setEditing(false)
        }}>
            <ViewContent
                title={
                    useMemo(
                        () => (
                            <input
                                type="text"
                                value={name}
                                onChange={e => mutate((prev) => ({ ...prev!, name: e.target.value }), { revalidate: false })}
                            />
                        ),
                        [mutate, name]
                    )
                }
                content={<>
                    {useMemo(
                        () => (
                            <textarea
                                rows={12}
                                value={description}
                                onChange={e => mutate((prev) => ({ ...prev!, description: e.target.value }), { revalidate: false })}
                            />
                        ),
                        [mutate, description]
                    )}
                </>}
            />
        </form>
    )
}
