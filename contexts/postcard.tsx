import { createStateContext } from "../utils/stateContext";
import { StaticImageData } from "next/image";


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createStateContext<string | StaticImageData>()
