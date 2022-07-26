import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Event } from "@prisma/client"
import classNames from "classnames"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { default as useSWR } from "swr"
import { useAxiosRequest } from "../../auth/requests"
import { ErrorBlock } from "../../generic/errors/renderers"
import { promiseMultiplexer, UsePromiseStatus } from "../../generic/loading/promise"
import { swrMultiplexer } from "../../generic/loading/swr"
import { LoadingInline } from "../../generic/loading/renderers"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import style from "./events.module.css"
import mood from "../../../styles/mood.module.css"


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
            <ul className={style.landingActionEventsList}>
                {data.map(e => (
                    <li key={e.slug}>
                        <Link href={`/events/${e.slug}`}>
                            {e.name}
                        </Link>
                    </li>
                ))}
            </ul>
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

    useEffect(
        () => {
            if (createHook.status === UsePromiseStatus.FULFILLED) {
                console.debug(`[LandingActionEventsFormCreate] Moving you to /events/${createHook.data!.slug}`)
                router.push(`/events/${createHook.data!.slug}`)
            }
        },
        [router]
    )

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
                    className={classNames(style.landingActionEventsFormCreateSubmit, mood.positive)}
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
                <LoadingInline text={t("landingEventsCreatePending")} />
            </p>
        ),
        rejected: ({ error }) => (
            <p>
                <ErrorBlock text={t("landingEventsCreateRejected")} error={error} />
            </p>
        ),
        fulfilled: ({ result }) => (
            <p>
                <LoadingInline text={t("landingEventsCreateFulfilled", name)} />
            </p>
        )
    })
}


export const LandingActionEvents = () => {
    const { t } = useTranslation()
    const apiHook = useSWR<Event[], Error>("/api/events/mine")

    return swrMultiplexer({
        hook: apiHook,
        loading: () => (
            <p>
                <LoadingInline text={t("landingEventsLoading")} />
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