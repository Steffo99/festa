import Image from "next/image";
import { PostcardContext } from "../contexts/postcard";
import { useDefinedContext } from "../hooks/useDefinedContext";

export function Postcard() {
    const [postcard, _] = useDefinedContext(PostcardContext)

    console.log(postcard)

    return (
        <img
            className="postcard"
            src={typeof postcard === "string" ? postcard : postcard.src}
            alt=""
            draggable={false}
        />
    )
}