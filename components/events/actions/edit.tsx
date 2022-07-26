import { Event } from "@prisma/client"
import { useTranslation } from "next-i18next"
import { Dispatch, SetStateAction, useMemo } from "react"
import { KeyedMutator } from "swr"
import { UsePromise } from "../../generic/loading/promise"
import { ViewContent } from "../../generic/views/content"


export type EventsActionViewProps = {
    data: Event,
    setData: Dispatch<SetStateAction<Event>>,
    save: UsePromise<void, void>,
    setEditing: Dispatch<boolean>,
}


export const EventsActionEdit = ({ data, setData, save, setEditing }: EventsActionViewProps) => {
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
                content={<>
                    <h1>
                        {useMemo(
                            () => (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setData(prev => ({ ...prev!, name: e.target.value }))}
                                    placeholder={t("eventNamePlaceholder")}
                                />
                            ),
                            [t, setData, name]
                        )}
                    </h1>
                    {useMemo(
                        () => (
                            <textarea
                                rows={12}
                                value={description}
                                onChange={e => setData(prev => ({ ...prev!, description: e.target.value }))}
                                placeholder={t("eventDescriptionPlaceholder")}
                            />
                        ),
                        [t, setData, description]
                    )}
                    {useMemo(
                        () => (
                            <input
                                type="text"
                                value={postcard ?? ""}
                                onChange={e => setData(prev => ({ ...prev!, postcard: e.target.value || null }))}
                                placeholder={t("eventPostcardPlaceholder")}
                            />
                        ),
                        [t, setData, postcard]
                    )}
                </>}
            />
        </form>
    )
}
