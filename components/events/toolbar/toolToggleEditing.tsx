import { faAsterisk, faPencil, faSave } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../../utils/definedContext"
import { EditingContext, EditingMode } from "../../generic/editable/base"
import { usePromise, UsePromiseStatus } from "../../generic/loading/promise"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import { Tool } from "../../generic/toolbar/tool"
import cursor from "../../../styles/cursor.module.css"


export type ToolToggleEditingProps = {
    save: () => Promise<void>,
}


/**
 * ToolBar {@link Tool} which switches between {@link EditingMode}s of the surrounding context.
 * 
 * It calls an async function to save data when switching from edit mode to view mode, preventing the user from switching back again until the data is saved, but allowing them to view the updated resource.
 */
export function ToolToggleEditing(props: ToolToggleEditingProps) {
    const { t } = useTranslation()
    const [editing, setEditing] = useDefinedContext(EditingContext)

    const { run: save, status: saveStatus } = usePromise<void, void>(props.save)

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
    else if (editing === EditingMode.EDIT) {
        return (
            <Tool
                aria-label={t("toolToggleEditingSave")}
                onClick={() => {
                    save()
                    setEditing(EditingMode.VIEW)
                }}
                className={"positive"}
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
                    setEditing(EditingMode.EDIT)
                }}
            >
                <FestaIcon icon={faPencil} />
            </Tool>
        )
    }
}
