import { useStorageState } from "react-storage-hooks";
import { createStateContext } from "../utils/stateContext";
import * as Telegram from "../utils/telegram"


/**
 * Context containing data about the user's current login status:
 * - `null` if the user is not logged in
 * - an instance of {@link LoginData} if the user is logged in
 * 
 * Please note that the data containing in this context is not validated, and will need to be validated by the server on every request.
 */
export const LoginContext = createStateContext<Telegram.LoginData | null>()
