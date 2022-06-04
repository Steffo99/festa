import { Event } from "@prisma/client"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAxiosRequest } from "../hooks/useAxiosRequest"
import { Loading } from "./Loading"
import { useEffect } from "react"
import { ErrorBlock } from "./errors/ErrorBlock"

export function EventCreate() {
    const { t } = useTranslation()
    const router = useRouter()
    const [name, setName] = useState<string>("")

    const createEvent = useAxiosRequest<Event>(
        {
            method: "POST", 
            url: "/api/events/", 
            data: { name }
        }, 
        (response) => {
            router.push(`/events/${response.data.slug}`)
        }
    )

    if (createEvent.running) return <Loading text={t("eventListCreateRunning")} />
    if (createEvent.data) return <Loading text={t("eventListCreateRedirecting")} />

    return <>
        <form
            className="form-monorow"
            onSubmit={e => { e.preventDefault(); createEvent.run() }}
            noValidate
        >
            <input
                type="text"
                placeholder={t("eventListCreateEventNameLabel")}
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="submit"
                aria-label={t("eventListCreateSubmitLabel")}
                className="positive square-40"
                value="→"
                onClick={e => createEvent.run()}
                disabled={!name}
            />
        </form>
        {createEvent.error ? <ErrorBlock error={createEvent.error} text={t("eventListCreateError")} /> : null}
    </>
}