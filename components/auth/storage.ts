import React, { useCallback, useState } from "react";
import { localStorageSaveJSON, useLocalStorageJSONLoad, useLocalStorageJSONState } from "../generic/storage/json";
import { AuthContextContents } from "./base";


/**
 * Hook which combines {@link useState}, {@link useLocalStorageJSONLoad}, and {@link localStorageSaveJSON}.
 */
export function useLocalStorageAuthState(key: string): [AuthContextContents | null, React.Dispatch<AuthContextContents | null>] {
    const [state, setStateInner] = useState<AuthContextContents | null>(null);

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
            localStorageSaveJSON(key, value);
            validateAndSetState(value);
        },
        [key, validateAndSetState]
    );

    return [state, setState];
}
