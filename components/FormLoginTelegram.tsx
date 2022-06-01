import axios, { AxiosError } from "axios"
import {default as classNames} from "classnames"
import { useTranslation } from "next-i18next"
import { HTMLProps, useCallback, useState } from "react"
import { LoginContext } from "../contexts/login"
import { ApiError, ApiResult } from "../types/api"
import { FestaLoginData, TelegramLoginData } from "../types/user"
import { useDefinedContext } from "../utils/definedContext"
import { TelegramLoginButton } from "./TelegramLoginButton"

export function FormLoginTelegram({className, ...props}: HTMLProps<HTMLFormElement>) {
    const { t } = useTranslation("common")    
    const [_, setLogin] = useDefinedContext(LoginContext)
    const [working, setWorking] = useState<boolean>(false)
    const [error, setError] = useState<ApiError | null | undefined>(null)

    const onLogin = useCallback(
        async (data: TelegramLoginData) => {
            setError(null)
            setWorking(true)

            try {
                var response = await axios.post<ApiResult<FestaLoginData>>("/api/login?provider=telegram", data)
            }
            catch(e) {
                const axe = e as AxiosError
                setError(axe?.response?.data as ApiError | undefined)
                return
            }
            finally {
                setWorking(false)
            }

            setLogin(response.data as FestaLoginData)
            localStorage.setItem("login", JSON.stringify(response.data))
        },
        []
    )

    const newClassName = classNames(className, {
        "negative": error,
    })
    
    let message: JSX.Element
    let contents: JSX.Element

    if(error) {
        message = t("formTelegramLoginError")
        contents = (
            <div>
                <code>
                    {JSON.stringify(error)}
                </code>
            </div>
        )
    }
    else if(working) {
        message = t("formTelegramLoginWorking")
        contents = <></>
    }
    else {
        message = t("formTelegramLoginDescription")
        contents = (
            <TelegramLoginButton
                dataOnauth={onLogin}
                botName={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}
            />
        )
    }
    
    return (
        <form className={newClassName}>
            <p>
                {message}
            </p>
            {contents}
        </form>
    )
}