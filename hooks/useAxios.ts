import { AxiosInstance, AxiosRequestConfig, default as axios } from "axios";
import { useContext, useMemo } from "react";
import { LoginContext } from "../contexts/login";
import { FestaLoginData } from "../types/user";

export function useAxios<D>(config: AxiosRequestConfig<D> = {}, data?: FestaLoginData | null): AxiosInstance {
    const loginContext = useContext(LoginContext)

    let login = data || loginContext?.[0]

    return useMemo(
        () => {
            const ax = axios.create({
                ...config,
                headers: {
                    ...(config.headers ?? {}),
                    Authorization: login ? `Bearer ${login.token}` : false,
                },
            })

            return ax
        },
        [config, login]
    )
}
