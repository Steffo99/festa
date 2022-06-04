import { PostcardContext } from "./PostcardContext"
import { useDefinedContext } from "../../utils/definedContext";


export function PostcardRenderer() {
    const [postcard,] = useDefinedContext(PostcardContext)

    return <>
        <div
            className="postcard"
            style={{backgroundImage: `url(${postcard})`}}
        />
    </>
}