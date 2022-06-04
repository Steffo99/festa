import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { default as classNames } from "classnames";

export function FestaIcon(props: FontAwesomeIconProps) {
    const newClassName = classNames(props.className, "icon")

    return (
        <FontAwesomeIcon
            {...props}
            className={newClassName}
        />
    )
}