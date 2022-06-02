import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "./FestaIcon";

type ErrorInlineProps = {
    error: JSON,
    text?: string
}

export function ErrorInline(props: ErrorInlineProps) {
    return (
        <span className="error error-inline negative">
            <FestaIcon icon={faCircleExclamation}/>
            &nbsp;
            <span>
                {props.text}
            </span>
            &nbsp;
            <code lang="json">
                {JSON.stringify(props.error)}
            </code>
        </span>
    )
}