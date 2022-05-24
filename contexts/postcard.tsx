import { createStateContext } from "../hooks/useStateContext";
import { StaticImageData } from "next/image";
import * as Telegram from "../utils/telegram"


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createStateContext<string | StaticImageData>()
