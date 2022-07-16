import { faBinoculars, faPencil } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../../utils/definedContext"
import { EditingContext, EditingMode } from "../../generic/editable/base"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import { Tool } from "../../generic/toolbar/tool"


/**
 * ToolBar {@link Tool} which switches between {@link EditingMode}s of the surrounding context.
 */
export function ToolToggleEditing() {
    const { t } = useTranslation()
    const [editing, setEditing] = useDefinedContext(EditingContext)

    if (editing === EditingMode.EDIT) {
        return (
            <Tool
                aria-label={t("toggleEditingView")}
                onClick={() => setEditing(EditingMode.VIEW)}
            >
                <FestaIcon icon={faBinoculars} />
            </Tool>
        )
    }
    else {
        return (
            <Tool
                aria-label={t("toggleEditingEdit")}
                onClick={() => setEditing(EditingMode.EDIT)}
            >
                <FestaIcon icon={faPencil} />
            </Tool>
        )
    }
}
