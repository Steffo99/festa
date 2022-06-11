import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Event } from "@prisma/client"
import classNames from "classnames"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { default as useSWR } from "swr"
import { useAxiosRequest } from "../../auth/requests"
import { ErrorBlock } from "../../generic/errors/renderers"
import { promiseMultiplexer } from "../../generic/loading/promise"
import { swrMultiplexer } from "../../generic/loading/swr"
import { LoadingTextInline } from "../../generic/loading/textInline"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import style from "./events.module.css"


/**
 * Displayed if the user has never created an event on Festa.
 */
const LandingActionEventsFirst = () => {
    const { t } = useTranslation()

    return (
        <p>
            <label htmlFor="festa-landing-action-events-form-create-name">
                {t("landingEventsFirstDescription")}
            </label>
        </p>
    )
}

/**
 * Displayed if the user has one or more events created on Festa.
 */
const LandingActionEventsList = ({ data }: { data: Event[] }) => {
    const { t } = useTranslation()

    return (
        <>
            <p>
                {t("landingEventsDescription")}
            </p>
            <p>
                <ul className={style.landingActionEventsList}>
                    {data.map(e => (
                        <li key={e.slug}>
                            <Link href={`/events/${e.slug}`}>
                                {e.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </p>
            <p>
                <label htmlFor="festa-landing-action-events-form-create-name">
                    {t("landingEventsCreateDescription")}
                </label>
            </p>
        </>
    )
}


/**
 * One-line form to create a new event on Festa.
 */
const LandingActionEventsFormCreate = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const [name, setName] = useState<string>("")

    const createHook = useAxiosRequest<Event, Partial<Event>>({ method: "POST", url: "/api/events/" })

    return promiseMultiplexer({
        hook: createHook,
        ready: ({ run }) => (
            <form className={style.landingActionEventsFormCreate}>
                <input
                    type="text"
                    placeholder={t("landingEventsCreatePlaceholder")}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    id="festa-landing-action-events-form-create-name"
                    className={style.landingActionEventsFormCreateName}
                />
                <button
                    aria-label={t("landingEventsCreateSubmitLabel")}
                    disabled={!name}
                    className={classNames(style.landingActionEventsFormCreateSubmit, "positive")}
                    onClick={e => {
                        e.preventDefault()
                        run({ data: { name } })
                    }}
                >
                    <FestaIcon icon={faPlus} />
                </button>
            </form>
        ),
        pending: ({ }) => (
            <p>
                <LoadingTextInline text={t("landingEventsCreatePending")} />
            </p>
        ),
        rejected: ({ error }) => (
            <p>
                <ErrorBlock text={t("landingEventsCreateRejected")} error={error} />
            </p>
        ),
        fulfilled: ({ result }) => {
            return (
                <p>
                    <LoadingTextInline text={t("landingEventsCreateFulfilled", name)} />
                </p>
            )
        },
    })
}


export const LandingActionEvents = () => {
    const { t } = useTranslation()
    const apiHook = useSWR<Event[], Error>("/api/events/mine")

    return swrMultiplexer({
        hook: apiHook,
        loading: () => (
            <p>
                <LoadingTextInline text={t("landingEventsLoading")} />
            </p>
        ),
        ready: (data) => (<>
            {data.length === 0 ?
                <LandingActionEventsFirst />
                :
                <LandingActionEventsList data={data} />
            }
            <LandingActionEventsFormCreate />
        </>),
        error: (error) => (
            <p>
                <ErrorBlock text={t("landingEventsError")} error={error} />
            </p>
        )
    })
}