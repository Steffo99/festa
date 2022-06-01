import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import { FestaIcon } from "./FestaIcon";

type LoadingProps = {
    text: string
}

export function Loading(props: LoadingProps) {
    const {t} = useTranslation()

    return (
        <span>
            <FestaIcon icon={faAsterisk} spin/>
            &nbsp;
            {props.text}
        </span>
    )
}