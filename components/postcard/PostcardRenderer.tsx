import { PostcardContext } from "./PostcardContext"
import { useDefinedContext } from "../../utils/definedContext";
import classNames from "classnames";


export function PostcardRenderer() {
    const { image, visibility } = useDefinedContext(PostcardContext)

    console.debug("[PostcardRenderer] Re-rendering with:", image)

    return (
        <div
            className={classNames("postcard", `postcard-${visibility}`)}
            style={{
                backgroundImage: image,
            }}
        />
    )
}