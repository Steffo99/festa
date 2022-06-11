import { memo, Reducer, useCallback, useEffect, useMemo, useReducer } from "react";

/**
 * The possible states of a {@link Promise}, plus an additional one that represents that it has not been started yet.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */
export enum UsePromiseStatus {
    READY,
    PENDING,
    REJECTED,
    FULFILLED,
}

/**
 * Action to start running the {@link Promise} contained in the {@link usePromise} hook, putting it in the {@link UsePromiseStatus.PENDING} state.
 */
type UsePromiseActionRun = { type: "start" }

/**
 * Action to fulfill the {@link Promise} contained in the {@link usePromise} hook, putting it in the {@link UsePromiseStatus.FULFILLED} state.
 */
type UsePromiseActionFulfill<D> = { type: "fulfill", result: D }

/**
 * Action to reject the {@link Promise} contained in the {@link usePromise} hook, putting it in the {@link UsePromiseStatus.REJECTED} state.
 */
type UsePromiseActionReject<E = Error> = { type: "reject", error: E }

/**
 * Actions that can be performed on the {@link useReducer} hook used inside {@link usePromise}.
 */
type UsePromiseAction<D, E = Error> = UsePromiseActionRun | UsePromiseActionFulfill<D> | UsePromiseActionReject<E>;

/**
 * The internal state of the {@link useReducer} hook used inside {@link usePromise}.
 */
type UsePromiseState<D, E = Error> = {
    status: UsePromiseStatus,
    result: D | undefined,
    error: E | undefined,
}

/**
 * The initial {@link UsePromiseState} of the {@link usePromise} hook.
 */
const initialUsePromise: UsePromiseState<any, any> = {
    status: UsePromiseStatus.READY,
    result: undefined,
    error: undefined,
}

/**
 * The reducer used by {@link usePromise}.
 */
function reducerUsePromise<D, E = Error>(prev: UsePromiseState<D, E>, action: UsePromiseAction<D, E>): UsePromiseState<D, E> {
    switch (action.type) {
        case "start":
            return { ...prev, status: UsePromiseStatus.PENDING }
        case "fulfill":
            return { status: UsePromiseStatus.FULFILLED, result: action.result, error: undefined }
        case "reject":
            return { status: UsePromiseStatus.REJECTED, error: action.error, result: undefined }
    }
}


/**
 * Async function that can be ran using {@link usePromise}.
 */
type UsePromiseFunction<D, P> = (params: P) => Promise<D>

/**
 * Values returned by the {@link usePromise} hook.
 */
export type UsePromise<D, P, E = Error> = UsePromiseState<D, E> & { run: (params: P) => Promise<void> }

/**
 * Hook executing an asyncronous function in a way that can be handled by React components.
 */
export function usePromise<D, P, E = Error>(func: UsePromiseFunction<D, P>): UsePromise<D, P, E> {
    const [state, dispatch] = useReducer<Reducer<UsePromiseState<D, E>, UsePromiseAction<D, E>>>(reducerUsePromise, initialUsePromise)

    const run = useCallback(
        async (params: P) => {
            dispatch({ type: "start" })

            try {
                var result = await func(params)
            }
            catch (error) {
                dispatch({ type: "reject", error: error as E })
                return
            }

            dispatch({ type: "fulfill", result })
            return
        },
        []
    )

    return { ...state, run }
}


export type PromiseMultiplexerReadyParams<D, P, E = Error> = {
    run: UsePromise<D, P, E>["run"],
}

export type PromiseMultiplexerPendingParams<D, P, E = Error> = {

}

export type PromiseMultiplexerFulfilledParams<D, P, E = Error> = {
    run: UsePromise<D, P, E>["run"],
    result: D,
}

export type PromiseMultiplexerRejectedParams<D, P, E = Error> = {
    run: UsePromise<D, P, E>["run"],
    error: E,
}


export type PromiseMultiplexerConfig<D, P, E = Error> = {
    hook: UsePromise<D, P, E>,
    ready: (params: PromiseMultiplexerReadyParams<D, P, E>) => JSX.Element,
    pending: (params: PromiseMultiplexerPendingParams<D, P, E>) => JSX.Element,
    fulfilled: (params: PromiseMultiplexerFulfilledParams<D, P, E>) => JSX.Element,
    rejected: (error: PromiseMultiplexerRejectedParams<D, P, E>) => JSX.Element,
}

/**
 * Function which selects and memoizes an output based on the {@link UsePromiseStatus} of a {@link usePromise} hook.
 * 
 * It would be nice for it to be a component, but TSX does not support that, since it's a generic function, and that would make all its types `unknown`.
 */
export function promiseMultiplexer<D, P, E = Error>(config: PromiseMultiplexerConfig<D, P, E>): JSX.Element {
    switch (config.hook.status) {
        case UsePromiseStatus.READY: return config.ready({ run: config.hook.run })
        case UsePromiseStatus.PENDING: return config.pending({})
        case UsePromiseStatus.FULFILLED: return config.fulfilled({ run: config.hook.run, result: config.hook.result! })
        case UsePromiseStatus.REJECTED: return config.rejected({ run: config.hook.run, error: config.hook.error! })
    }
}
