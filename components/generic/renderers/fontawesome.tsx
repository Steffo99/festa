import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { default as classNames } from "classnames";
import { memo } from "react";

/**
 * Component which adds proper styling to {@link FontAwesomeIcon}.
 */
export const FestaIcon = memo((props: FontAwesomeIconProps) => {
    return (
        <FontAwesomeIcon
            {...props}
            className={classNames("icon", props.className)}
        />
    )
})
FestaIcon.displayName = "FestaIcon"
