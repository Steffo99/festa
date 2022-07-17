import { AuthContext } from "./base";
import { useLocalStorageAuthState } from "./storage";


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
