import { createDefinedContext } from "../../utils/definedContext";


export type PostcardContextValue = {
    postcard: string,
    setPostcard: React.Dispatch<React.SetStateAction<string>>,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}


/**
 * Context containing data about the website's current postcard, the blurred background image.
 */
export const PostcardContext = createDefinedContext<PostcardContextValue>()
