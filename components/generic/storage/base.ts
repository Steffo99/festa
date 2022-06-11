import { useCallback, useEffect, useState } from "react"


/**
 * Load a value from the {@link localStorage} in a SSR-compatible way.
 */
export function localStorageLoad(key: string): string | undefined {
    // Prevent the hook from running on Node without causing an error, which can't be caught due to the Rules of Hooks.
    const thatLocalStorageOverThere = typeof localStorage !== "undefined" ? localStorage : undefined
    if (thatLocalStorageOverThere === undefined) return undefined
    // Load and return the value.
    return thatLocalStorageOverThere.getItem(key) ?? undefined
}


/**
 * Save a value in the {@link localStorage} in a SSR-compatible way.
 * 
 * If value is `undefined`, the value is instead removed from the storage.
 */
export function localStorageSave(key: string, value: string | undefined) {
    // Prevent the hook from running on Node without causing an error, which can't be caught due to the Rules of Hooks.
    const thatLocalStorageOverThere = typeof localStorage !== "undefined" ? localStorage : undefined
    if (thatLocalStorageOverThere === undefined) return undefined

    if (value === undefined) {
        thatLocalStorageOverThere.removeItem(key)
    }
    else {
        thatLocalStorageOverThere.setItem(key, value)
    }
}


/**
 * Hook which runs {@link localStorageLoad} every time key and callback change and passes the result to the callback as an effect.
 */
export function useLocalStorageLoad(key: string, callback: (data: string | undefined) => void) {
    useEffect(
        () => {
            let value = localStorageLoad(key)

            callback(value)
        },
        [key, callback]
    )
}


/**
 * Hook which combines {@link useState}, {@link useLocalStorageLoad}, and {@link localStorageSave}.
 */
export function useLocalStorageState(key: string, placeholder: string) {
    const [state, setInnerState] = useState<string | undefined>(undefined)
    useLocalStorageLoad(key, setInnerState)

    const setState = useCallback(
        (value: string) => {
            localStorageSave(key, value)
            setInnerState(value)
        },
        [key, setInnerState]
    )

    return [state, setState]
}


