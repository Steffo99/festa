import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import { FestaIcon } from "./FestaIcon";

type ErrorInlineProps = {
    error: JSON,
    text?: string
}

export function ErrorInline(props: ErrorInlineProps) {
    const {t} = useTranslation()

    return (
        <span className="error error-inline negative">
            <FestaIcon icon={faCircleExclamation}/>
            &nbsp;
            <span>
                {props.text ?? t("genericError")}
            </span>
            &nbsp;
            <code lang="json">
                {JSON.stringify(props.error)}
            </code>
        </span>
    )
}