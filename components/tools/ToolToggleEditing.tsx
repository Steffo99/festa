import { faBinoculars, faPencil } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { EditingContext } from "../../contexts/editing"
import { useDefinedContext } from "../../utils/definedContext"
import { FestaIcon } from "../extensions/FestaIcon"

export function ToolToggleEditing() {
    const {t} = useTranslation()
    const [editing, setEditing] = useDefinedContext(EditingContext)

    return (
        <button 
            aria-label={editing ? t("toggleEditingView") : t("toggleEditingEdit")}
            onClick={() => setEditing(!editing)}
            className="toolbar-tool"
        >
            <FestaIcon icon={editing ? faBinoculars : faPencil}/>
        </button>
    )
}