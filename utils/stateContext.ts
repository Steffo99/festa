import { Context, Dispatch, SetStateAction } from "react"
import { createDefinedContext } from "./definedContext"

/**
 * Create a new defined context (see {@link createDefinedContext}) containing the tuple returned by useState for the given type.
 * 
 * @returns The created context.
 */
export function createStateContext<T>(): Context<[T, Dispatch<T>] | undefined> {
    return createDefinedContext<[T, React.Dispatch<T>]>()
}
