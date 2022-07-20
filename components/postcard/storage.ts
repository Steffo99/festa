import { Reducer, useCallback, useReducer } from "react"
import { PostcardContextContents, PostcardSource, PostcardVisibility } from "./base"


/**
 * Action of {@link usePostcardStorage} changing the current postcard to a new one.
 */
type UsePostcardStorageActionChange = { type: "change", src: PostcardSource }

/**
 * Action of {@link usePostcardStorage} changing the visibility of the current postcard.
 */
type UsePostcardStorageActionDisplay = { type: "display", visibility: PostcardVisibility }

/**
 * All possible actions of the reducer of {@link usePostcardStorage}.
 */
type UsePostcardStorageAction = UsePostcardStorageActionChange | UsePostcardStorageActionDisplay

/**
 * The state of the reducer of {@link usePostcardStorage}.
 */
type UsePostcardStorageState = {
    visibility: PostcardVisibility,
    currentSrc: PostcardSource,
    previousSrc: PostcardSource,
}

/**
 * Reducer for {@link usePostcardStorage}.
 */
function reducerUsePostcardStorage(prev: UsePostcardStorageState, action: UsePostcardStorageAction): UsePostcardStorageState {
    switch (action.type) {
        case "change":
            if (action.src !== prev.currentSrc) {
                return { ...prev, previousSrc: prev.currentSrc, currentSrc: action.src }
            }
            else {
                return prev
            }
        case "display":
            return { ...prev, visibility: action.visibility }
    }
}

/**
 * Convert a {@link PostcardSource} to a string suitable for use in `<img>` tags.
 */
function getProperSrc(obj: PostcardSource): string {
    if (typeof obj === "string") {
        return obj
    }
    else {
        return obj.src
    }
}

/**
 * Hook holding as state the {@link PostcardContextContents}.
 */
export function usePostcardStorage(defaultPostcard: PostcardSource): PostcardContextContents {
    const [{ previousSrc, currentSrc, visibility }, dispatch] = useReducer<Reducer<UsePostcardStorageState, UsePostcardStorageAction>>(
        reducerUsePostcardStorage,
        {
            visibility: PostcardVisibility.BACKGROUND,
            previousSrc: defaultPostcard,
            currentSrc: defaultPostcard
        }
    )

    const changePostcard = useCallback(
        (src: PostcardSource) => {
            dispatch({ type: "change", src })
        },
        [dispatch]
    )

    const resetPostcard = useCallback(
        () => {
            changePostcard(defaultPostcard)
        },
        [changePostcard, defaultPostcard]
    )

    const changeVisibility = useCallback(
        (visibility: PostcardVisibility) => {
            dispatch({ type: "display", visibility })
        },
        [dispatch]
    )

    return {
        previousSrc: getProperSrc(previousSrc),
        currentSrc: getProperSrc(currentSrc),
        changePostcard,
        resetPostcard,
        changeVisibility,
        visibility,
    };
}
