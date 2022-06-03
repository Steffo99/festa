import { PostcardContext } from "../contexts/postcard";
import { useDefinedContext } from "../utils/definedContext";

export function Postcard() {
    const [postcard, _] = useDefinedContext(PostcardContext)

    const postcardUrl = typeof postcard === "string" ? postcard : postcard.src

    /* eslint-disable @next/next/no-img-element */
    return <>
        <div
            className="postcard"
            style={{backgroundImage: `url(${postcardUrl})`}}
        />
    </>
}