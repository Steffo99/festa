import Image, { ImageProps } from "next/image";
import classNames from "classnames"

export function Avatar(props: ImageProps) {
    return (
        <Image
            alt=""
            {...props}
            className={classNames(props.className, "avatar")}
        />
    )
}