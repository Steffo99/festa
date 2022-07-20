import { Event } from "@prisma/client"
import { useTranslation } from "next-i18next"
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
    const { t } = useTranslation()

    const name = data.name
    const description = data.description
    const postcard = data.postcard

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
                                placeholder={t("eventNamePlaceholder")}
                            />
                        ),
                        [t, mutate, name]
                    )
                }
                content={<>
                    {useMemo(
                        () => (
                            <textarea
                                rows={12}
                                value={description}
                                onChange={e => mutate((prev) => ({ ...prev!, description: e.target.value }), { revalidate: false })}
                                placeholder={t("eventDescriptionPlaceholder")}
                            />
                        ),
                        [t, mutate, description]
                    )}
                    {useMemo(
                        () => (
                            <input
                                type="text"
                                value={postcard ?? ""}
                                onChange={e => mutate((prev) => ({ ...prev!, postcard: e.target.value || null }), { revalidate: false })}
                                placeholder={t("eventPostcardPlaceholder")}
                            />
                        ),
                        [t, mutate, postcard]
                    )}
                </>}
            />
        </form>
    )
}
