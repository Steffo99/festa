import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { useDefinedContext } from "../../../utils/definedContext"
import { FestaIcon } from "../../generic/renderers/fontawesome"
import { Tool } from "../../generic/toolbar/tool"
import { PostcardContext, PostcardVisibility } from "../base"


/**
 * Toolbar tool which toggles the {@link PostcardVisibility} state of its wrapping context.
 */
export function ToolToggleVisibility() {
    const { t } = useTranslation()
    const { visibility, setVisibility } = useDefinedContext(PostcardContext)

    if (visibility === PostcardVisibility.BACKGROUND) {
        return (
            <Tool
                aria-label={t("toggleVisibleShow")}
                onClick={() => setVisibility(PostcardVisibility.FOREGROUND)}
            >
                <FestaIcon icon={faEye} />
            </Tool>
        )
    }
    else {
        return (
            <Tool
                aria-label={t("toggleVisibleHide")}
                onClick={() => setVisibility(PostcardVisibility.BACKGROUND)}
            >
                <FestaIcon icon={faEyeSlash} />
            </Tool>
        )
    }
}
