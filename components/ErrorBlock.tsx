import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import { FestaIcon } from "./FestaIcon";

type ErrorBlockProps = {
    error: JSON,
    text?: string
}

export function ErrorBlock(props: ErrorBlockProps) {
    const {t} = useTranslation()

    return (
        <div className="error error-block negative">
            <p>
                <FestaIcon icon={faCircleExclamation}/>
                &nbsp;
                <span>
                    {props.text ?? t("genericError")}
                </span>
            </p>
            <pre>
                <code lang="json">
                    {JSON.stringify(props.error, undefined, 4)}
                </code>
            </pre>
        </div>
    )
}