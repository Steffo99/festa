import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "../extensions/FestaIcon";

type ErrorBlockProps = {
    error: Error,
    text: string
}

export function ErrorBlock(props: ErrorBlockProps) {
    return (
        <div className="error error-block negative">
            <p>
                <FestaIcon icon={faCircleExclamation} />
                &nbsp;
                <span>
                    {props.text}
                </span>
            </p>
            <pre>
                <code>
                    <b>{props.error.name}</b> 
                    :&nbsp;
                    {props.error.message}
                </code>
            </pre>
        </div>
    )
}