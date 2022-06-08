import { FestaLoginData } from "../../types/user";
import { createStateContext } from "../../utils/stateContext";


/**
 * Context containing data about the user's current login status:
 * - `null` if the user is not logged in
 * - an instance of {@link FestaLoginData} if the user is logged in
 * 
 * Please note that the data containing in this context is not validated, and will be validated by the server on every request.
 */
export const LoginContext = createStateContext<FestaLoginData | null>()
