import { useCallback, useEffect, useState } from "react";
import { localStorageSave, localStorageLoad } from "./base";


/** 
 * Load a value from the {@link localStorage} using {@link localStorageLoad}, then parse it as {@link JSON}.
 */
export function localStorageLoadJSON<Expected>(key: string): Expected | undefined {
    const value = localStorageLoad(key)

    if (value === undefined) {
        return undefined
    }
    else {
        return JSON.parse(value)
    }
}


/**
 * Convert a value to {@link JSON}, then save a value in the {@link localStorage} using {@link localStorageSave}.
 * 
 * If value is `undefined`, the value is instead removed from the storage.
 */
export function localStorageSaveJSON<Expected>(key: string, value: Expected | undefined) {
    if (value === undefined) {
        localStorageSave(key, undefined)
    }
    else {
        const str = JSON.stringify(value)
        localStorageSave(key, str)
    }
}


/**
 * Hook which behaves like {@link useLocalStorageLoad}, but uses {@link localStorageLoadJSON} instead.
 */
export function useLocalStorageJSONLoad<Expected>(key: string, callback: (data: Expected) => void) {
    useEffect(
        () => {
            try {
                // This usage of var is deliberate.
                var value = localStorageLoadJSON<Expected>(key)
            }
            catch (e) {
                console.error("[useLocalStorageJSONLoad] Encountered an error while loading JSON value:", e)
            }

            if (value !== undefined) {
                callback(value)
            }
        },
        [key, callback]
    )
}


/**
 * Hook which combines {@link useState}, {@link useLocalStorageJSONLoad}, and {@link localStorageSaveJSON}.
 */
export function useLocalStorageJSONState<Expected>(key: string) {
    const [state, setStateInner] = useState<Expected | undefined>(undefined);
    useLocalStorageJSONLoad(key, setStateInner);

    const setState = useCallback(
        (value: Expected) => {
            localStorageSaveJSON(key, value);
            setStateInner(value);
        },
        [key, setStateInner]
    );

    return [state, setState];
}
