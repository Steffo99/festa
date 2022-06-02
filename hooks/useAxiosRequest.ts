import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useReducer } from "react";
import { useAxios } from "./useAxios";

type ReducerActionStart = { type: "start" }
type ReducerActionDone<T, D = any> = { type: "done", response: AxiosResponse<T, D> }
type ReducerActionError<T, D = any> = { type: "error", error: any }
type ReducerAction<T, D = any> = ReducerActionStart | ReducerActionDone<T, D> | ReducerActionError<T, D>

type ReducerState<T, D = any> = {
    running: boolean,
    response: AxiosResponse<T, D> | undefined,
    error: any | undefined,
}

export function useAxiosRequest<T, D = any>(config: AxiosRequestConfig<D> = {}, hookConfig: AxiosRequestConfig<D> = {}) {
    const axios = useAxios(hookConfig)

    const [state, dispatch] = useReducer(
        (prev: ReducerState<T, D>, action: ReducerAction<T, D>) => {
            switch (action.type) {
                case "start":
                    return {
                        running: true,
                        response: undefined,
                        error: undefined,
                    }
                case "done":
                    return {
                        running: false,
                        response: action.response,
                        error: undefined,
                    }
                case "error":
                    return {
                        running: false,
                        response: action.error.response,
                        error: action.error
                    }
            }
        },
        {
            running: false,
            response: undefined,
            error: undefined,
        }
    )

    const run = useCallback(

        async (funcConfig: AxiosRequestConfig<D> = {}) => {
            dispatch({ type: "start" })

            try {
                throw {potat: "t"}    
                var response: AxiosResponse<T, D> = await axios.request({ ...config, ...funcConfig })
            }
            catch (error) {
                dispatch({ type: "error", error })
                return
            }

            dispatch({ type: "done", response })
        },
        [axios, hookConfig]
    )

    return {
        running: state.running,
        response: state.response,
        data: state.response?.data as T | undefined,
        error: state.error,
        run,
    }
}