import { StaticImageData } from "next/image";
import { createDefinedContext } from "../../utils/definedContext";


/**
 * The string to be used as the `src` of the postcard.
 */
export type PostcardSource = string | StaticImageData


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
    visibility: PostcardVisibility,
    previousSrc: string,
    currentSrc: string,
    changePostcard: (src: PostcardSource) => void,
    resetPostcard: () => void,
    changeVisibility: (visibility: PostcardVisibility) => void,
}


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createDefinedContext<PostcardContextContents>()
