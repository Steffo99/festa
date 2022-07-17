import { Token, User } from "@prisma/client"
import { default as React } from "react"
import { createStateContext } from "../../utils/stateContext"
import { useLocalStorageAuthState } from "./storage"


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


/**
 * Component which stores the login status using {@link useLocalStorageAuthState} and provides it to its children through a {@link AuthContext}.
 */
export function AuthContextProvider({ storageKey, children }: { storageKey: string, children: React.ReactNode }) {
    return (
        <AuthContext.Provider value={useLocalStorageAuthState(storageKey)}>
            {children}
        </AuthContext.Provider>
    )
}