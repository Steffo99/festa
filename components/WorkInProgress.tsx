import { faBrush } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "next-i18next"
import { FestaIcon } from "./extensions/FestaIcon"


export function WorkInProgress() {
    const {t} = useTranslation()

    return (
        <div className="work-in-progress">
            <FestaIcon icon={faBrush}/> {t("workInProgress")}
        </div>
    )
}