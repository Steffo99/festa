import { createDefinedContext } from "../../utils/definedContext";


/**
 * The string to be used as the [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) CSS property of the postcard.
 */
export type PostcardImage = string;


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
type PostcardContextValue = {
    image: PostcardImage,
    setImage: React.Dispatch<React.SetStateAction<PostcardImage>>,
    visibility: PostcardVisibility,
    setVisibility: React.Dispatch<React.SetStateAction<PostcardVisibility>>,
}


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createDefinedContext<PostcardContextValue>()
