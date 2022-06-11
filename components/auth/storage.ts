import { useCallback, useState } from "react";
import { localStorageSaveJSON, useLocalStorageJSONLoad, useLocalStorageJSONState } from "../generic/storage/json";
import { AuthContextContents } from "./base";


/**
 * Hook holding as state the {@link AuthContextContents}.
 */
export function useStateAuth() {
    return useState<AuthContextContents>(null)
}


/**
 * Hook which combines {@link useState}, {@link useLocalStorageJSONLoad}, and {@link localStorageSaveJSON}.
 */
export function useLocalStorageAuthState(key: string) {
    const [state, setStateInner] = useState<AuthContextContents | undefined>(undefined);

    const validateAndSetState = useCallback(
        (data: any) => {
            // Convert expiresAt to a Date, since it is stringified on serialization
            data = { ...data, expiresAt: new Date(data.expiresAt) }

            // Refuse to load expired data
            if (new Date().getTime() >= data.expiresAt.getTime()) {
                return
            }

            setStateInner(data)
        },
        [setStateInner]
    )

    useLocalStorageJSONLoad(key, validateAndSetState);

    const setState = useCallback(
        (value: AuthContextContents) => {
            validateAndSetState(value);
            localStorageSaveJSON(key, value);
        },
        [key, validateAndSetState]
    );

    return [state, setState];
}
