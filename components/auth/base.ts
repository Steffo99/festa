import { Token, User } from "@prisma/client"
import { createStateContext } from "../../utils/stateContext"


/**
 * Data about the user's current login status:
 * - `null` if the user is not logged in
 * - a {@link Token} with information about the {@link User} if the user is logged in
 */
export type AuthContextContents = Token & { user: User } | null


/**
 * {@link createStateContext|state context} containing {@link AuthContextContents}.
 * 
 * Please note that the data containing in this context is not validated, and has to be validated by the server on every request.
 */
export const AuthContext = createStateContext<AuthContextContents>()
