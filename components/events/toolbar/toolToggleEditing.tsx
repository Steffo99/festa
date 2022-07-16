import { faBinoculars, faPencil } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../../utils/definedContext"
import { EditingContext, EditingMode } from "../../generic/editable/base"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import { Tool } from "../../generic/toolbar/tool"


export type ToolToggleEditingProps = {
    onViewStart?: () => void,
    onViewEnd?: () => void,
    onEditStart?: () => void,
    onEditEnd?: () => void,
}


/**
 * ToolBar {@link Tool} which switches between {@link EditingMode}s of the surrounding context.
 */
export function ToolToggleEditing({ onViewStart, onViewEnd, onEditStart, onEditEnd }: ToolToggleEditingProps) {
    const { t } = useTranslation()
    const [editing, setEditing] = useDefinedContext(EditingContext)

    if (editing === EditingMode.EDIT) {
        return (
            <Tool
                aria-label={t("toggleEditingView")}
                onClick={() => {
                    onEditEnd?.()
                    setEditing(EditingMode.VIEW)
                    onViewStart?.()
                }}
            >
                <FestaIcon icon={faBinoculars} />
            </Tool>
        )
    }
    else {
        return (
            <Tool
                aria-label={t("toggleEditingEdit")}
                onClick={() => {
                    onViewEnd?.()
                    setEditing(EditingMode.EDIT)
                    onEditStart?.()
                }}
            >
                <FestaIcon icon={faPencil} />
            </Tool>
        )
    }
}
