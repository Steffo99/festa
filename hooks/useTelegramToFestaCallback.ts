import { default as axios, AxiosError } from "axios"
import { useCallback, Dispatch, SetStateAction } from "react"
import { ApiError, ApiResult } from "../types/api"
import { FestaLoginData, TelegramLoginData } from "../types/user"


export function useTelegramToFestaCallback(setLogin: Dispatch<SetStateAction<FestaLoginData | null>>, setError: Dispatch<SetStateAction<ApiError | null | undefined>>): (data: TelegramLoginData) => Promise<void> {
    return useCallback(
        async (data: TelegramLoginData) => {
            setError(null)

            try {
                var response = await axios.post<ApiResult<FestaLoginData>>("/api/login?provider=telegram", data)
            }
            catch(e) {
                const axe = e as AxiosError
                setError(axe?.response?.data as ApiError | undefined)
                return
            }

            setLogin(response.data as FestaLoginData)
            localStorage.setItem("login", JSON.stringify(response.data))
        },
        []
    )
}