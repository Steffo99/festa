import Image from "next/image";
import { PostcardContext } from "../contexts/postcard";
import { useDefinedContext } from "../utils/definedContext";

export function Postcard() {
    const [postcard, _] = useDefinedContext(PostcardContext)

    /* eslint-disable @next/next/no-img-element */
    return (
        <img
            className="postcard"
            src={typeof postcard === "string" ? postcard : postcard.src}
            alt=""
            draggable={false}
        />
    )
}