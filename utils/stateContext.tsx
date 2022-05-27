import * as React from "react"
import { useContext } from "react"
import { createDefinedContext } from "./definedContext"

/**
 * Create a new defined context (see {@link createDefinedContext}) containing the tuple returned by {@link React.useState} for the given type.
 * 
 * @returns The created context.
 */
export function createStateContext<T>(): React.Context<[T, React.Dispatch<React.SetStateAction<T>>] | undefined> {
    return createDefinedContext<[T, React.Dispatch<React.SetStateAction<T>>]>()
}
