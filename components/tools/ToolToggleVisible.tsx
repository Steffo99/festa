import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../utils/definedContext"
import { FestaIcon } from "../extensions/FestaIcon"
import { PostcardContext, PostcardVisibility } from "../postcard/PostcardContext"

export function ToolToggleVisible() {
    const { t } = useTranslation()
    const { visibility, setVisibility } = useDefinedContext(PostcardContext)

    if (visibility === PostcardVisibility.BACKGROUND) {
        return (
            <button
                aria-label={t("toggleVisibleShow")}
                onClick={() => setVisibility(PostcardVisibility.FOREGROUND)}
                className="toolbar-tool"
            >
                <FestaIcon icon={faEye} />
            </button>
        )
    }
    else {
        return (
            <button
                aria-label={t("toggleVisibleHide")}
                onClick={() => setVisibility(PostcardVisibility.BACKGROUND)}
                className="toolbar-tool"
            >
                <FestaIcon icon={faEyeSlash} />
            </button>
        )
    }
}