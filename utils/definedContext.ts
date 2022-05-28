import * as React from "react"
import { useContext } from "react"

/**
 * Create a new context which is `undefined` outside of all providers.
 * 
 * @returns The created context.
 */
export function createDefinedContext<T>(): React.Context<T | undefined> {
    return React.createContext<T | undefined>(undefined)
}

/**
 * Use a context which is `undefined` outside of its providers, immediately accessing the value if it is available, or throwing an error if it isn't.
 * 
 * @param context The context to use.
 * @returns The non-undefined value of the context.
 * @throws If the hook is called outside of all providers of the given context, or if the value of the context is `undefined`.
 */
export function useDefinedContext<T>(context: React.Context<T | undefined>): T {
    const value = useContext(context)
    if(value === undefined) {
        throw new Error(`Tried to access ${context.displayName} outside of a provider.`)
    }
    return value
}
