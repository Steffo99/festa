import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FestaIcon } from "./FestaIcon";

type LoadingProps = {
    text: string
}

export function Loading(props: LoadingProps) {
    return (
        <span>
            <FestaIcon icon={faAsterisk} spin/>
            &nbsp;
            {props.text}
        </span>
    )
}