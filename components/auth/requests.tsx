import { AxiosInstance, AxiosRequestConfig, AxiosResponse, default as axios } from "axios";
import { AuthContext, AuthContextContents } from "./base";
import { ReactNode, useCallback, useContext } from "react";
import { usePromise } from "../generic/loading/promise";
import { default as useSWR, SWRConfig } from "swr"

/**
 * Hook which creates an {@link AxiosInstance} based on the current {@link AuthContext}, using the appropriate `Authentication` header the context is non-null.
 */
export function useAxios(): AxiosInstance {
    const authContext = useContext(AuthContext)

    let auth: AuthContextContents | undefined = authContext?.[0]

    return axios.create({
        headers: {
            Authorization: auth ? `Bearer ${auth.token}` : false,
        },
    })
}


/**
 * Hook which returns the callback to use as fetcher in {@link useSWR} calls.
 * 
 * Preferably set through {@link SWRConfig}.
 */
export function useAxiosSWRFetcher() {
    const axios = useAxios()

    return useCallback(
        async (resource: string, init: AxiosRequestConfig<any>) => {
            const response = await axios.get(resource, init)
            return response.data
        },
        [axios]
    )
}


export type AxiosSWRFetcherProviderProps = {
    children: ReactNode,
}


/**
 * Component which provides the fetcher to {@link useSWR} via {@link useAxiosSWRFetcher}.
 */
export const AxiosSWRFetcherProvider = ({ children }: AxiosSWRFetcherProviderProps) => {
    return (
        <SWRConfig value={{ fetcher: useAxiosSWRFetcher() }}>
            {children}
        </SWRConfig>
    )
}


/**
 * Hook which uses {@link useAxios} to perform a single HTTP request with the given configuration, tracking the status of the request and any errors that may arise from it.
 */
export function useAxiosRequest<Output = any, Input = any>(config: AxiosRequestConfig<Input> = {}) {
    const axios = useAxios()

    const performRequest = useCallback(
        async (funcConfig: AxiosRequestConfig<Input> = {}): Promise<AxiosResponse<Output, Input>> => {
            return await axios.request({ ...config, ...funcConfig })
        },
        [config]
    )

    const promiseHook = usePromise(performRequest)

    return { ...promiseHook, data: promiseHook.result?.data }
}
