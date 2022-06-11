import { ImageProps } from "next/image"
import { createDefinedContext } from "../../utils/definedContext";


/**
 * The string to be used as the `src` of the postcard.
 */
export type PostcardSource = ImageProps["src"]


/**
 * How the postcard is displayed on the page.
 */
export enum PostcardVisibility {
    /**
     * The postcard is filtered, blurred, and rendered behind all elements on the page.
     */
    BACKGROUND = "background",

    /**
     * The postcard is fully visible and rendered above all other elements.
     */
    FOREGROUND = "foreground",
}


/**
 * Contents of the {@link PostcardContext}.
 */
export type PostcardContextContents = {
    src: PostcardSource,
    setSrc: React.Dispatch<React.SetStateAction<PostcardSource>>,
    visibility: PostcardVisibility,
    setVisibility: React.Dispatch<React.SetStateAction<PostcardVisibility>>,
}


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createDefinedContext<PostcardContextContents>()



