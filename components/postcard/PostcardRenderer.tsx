import { PostcardContext } from "./PostcardContext"
import { useDefinedContext } from "../../utils/definedContext";
import classNames from "classnames";


export function PostcardRenderer() {
    const {postcard, visible} = useDefinedContext(PostcardContext)

    return <>
        <div
            className={classNames({
                "postcard": true,
                "postcard-visible": visible,
            })}
            style={{
                backgroundImage: `url(${postcard})`
            }}
        />
    </>
}