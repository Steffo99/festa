import { useTranslation } from "next-i18next"
import { useCallback, useState } from "react"
import { LoginContext } from "../contexts/login"
import { useDefinedContext } from "../utils/definedContext"
import { TelegramLoginButton } from "./TelegramLoginButton"
import { default as axios } from "axios"
import { AuthenticatedUserData, TelegramLoginData } from "../types/user"


export function SectionLoginTelegram() {
    const { t } = useTranslation("common")
    const [login, setLogin] = useDefinedContext(LoginContext)
    const [error, setError] = useState<any>(null)

    return <section>
    </section>
}