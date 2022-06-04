import { createStateContext } from "../../utils/stateContext";


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createStateContext<string>()
