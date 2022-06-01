import { useTranslation } from "next-i18next"
import { FormEvent, MouseEventHandler, useCallback, useRef, useState } from "react"
import { Loading } from "./Loading"

export function EventCreate() {
    const {t} = useTranslation()
    const [name, setName] = useState<string>("")
    const [running, setRunning] = useState<boolean>(false)

    const createEvent = useCallback(() => {
            setRunning(true)
        },
        []
    )

    if(running) return <Loading text={t("eventListCreateRunning")}/>

    return (
        <form 
            className="form-monorow"
            onSubmit={e => {e.preventDefault(); createEvent()}}
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
                onClick={e => createEvent()}
                disabled={!name}
            />
        </form>
    )
}