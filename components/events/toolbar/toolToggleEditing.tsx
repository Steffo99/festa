import { faAsterisk, faPencil, faSave } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { usePromise, UsePromiseStatus } from "../../generic/loading/promise"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import { Tool } from "../../generic/toolbar/tool"
import cursor from "../../../styles/cursor.module.css"
import mood from "../../../styles/mood.module.css"
import { Dispatch } from "react"


export type ToolToggleEditingProps = {
    editing: boolean,
    setEditing: Dispatch<boolean>,
    save: () => Promise<void>,
}


/**
 * ToolBar {@link Tool} which allows the user to start editing an event and then save their changes.
 */
export function ToolToggleEditing({ editing, setEditing, save: upperSave }: ToolToggleEditingProps) {
    const { t } = useTranslation()

    const { run: save, status: saveStatus } = usePromise<void, void>(upperSave)

    if (saveStatus === UsePromiseStatus.PENDING) {
        return (
            <Tool
                aria-label={t("toolToggleEditingSaving")}
                disabled
                className={cursor.loadingBlocking}
            >
                <FestaIcon icon={faAsterisk} spin />
            </Tool>
        )
    }
    else if (editing) {
        return (
            <Tool
                aria-label={t("toolToggleEditingSave")}
                onClick={() => {
                    save()
                    setEditing(false)
                }}
                className={mood.positive}
            >
                <FestaIcon icon={faSave} />
            </Tool>
        )
    }
    else {
        return (
            <Tool
                aria-label={t("toolToggleEditingEdit")}
                onClick={() => {
                    setEditing(true)
                }}
            >
                <FestaIcon icon={faPencil} />
            </Tool>
        )
    }
}
