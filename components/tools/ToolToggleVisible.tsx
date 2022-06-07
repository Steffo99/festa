import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../utils/definedContext"
import { FestaIcon } from "../extensions/FestaIcon"
import { PostcardContext } from "../postcard/PostcardContext"

export function ToolToggleVisible() {
    const {t} = useTranslation()
    const {visible, setVisible} = useDefinedContext(PostcardContext)

    return (
        <button 
            aria-label={visible ? t("toggleVisibleHide") : t("toggleVisibleShow")}
            onClick={() => setVisible(!visible)}
            className="toolbar-tool"
        >
            <FestaIcon icon={visible ? faEyeSlash : faEye}/>
        </button>
    )
}