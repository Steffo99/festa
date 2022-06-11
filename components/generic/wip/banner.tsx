import { faBrush } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { FestaIcon } from "../renderers/fontawesome"
import style from "./banner.module.css"


/**
 * A banner to be displayed on the top of a page explaining that a certain page isn't ready yet for user interaction.
 */
export function WIPBanner() {
    const { t } = useTranslation()

    return (
        <div className={style.wipBanner}>
            <FestaIcon icon={faBrush} /> {t("workInProgress")}
        </div>
    )
}
