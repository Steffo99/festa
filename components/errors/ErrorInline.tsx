import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "../extensions/FestaIcon";

type ErrorInlineProps = {
    error: Error,
    text?: string
}

export function ErrorInline(props: ErrorInlineProps) {
    return (
        <span className="error error-inline negative">
            <FestaIcon icon={faCircleExclamation} />
            &nbsp;
            {props.text ?
                <>
                    <span>
                        {props.text}
                    </span>
                    &nbsp;
                </>
            : null}
            <code lang="json">
                {JSON.stringify(props.error)}
            </code>
        </span>
    )
}