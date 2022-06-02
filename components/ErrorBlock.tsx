import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "./FestaIcon";

type ErrorBlockProps = {
    error: JSON,
    text: string
}

export function ErrorBlock(props: ErrorBlockProps) {

    return (
        <div className="error error-block negative">
            <p>
                <FestaIcon icon={faCircleExclamation}/>
                &nbsp;
                <span>
                    {props.text}
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