import { useTranslation } from "next-i18next"
import { useCallback } from "react"
import { LoginContext } from "../contexts/login"
import { useDefinedContext } from "../utils/definedContext"
import { TelegramLoginButton } from "./TelegramLoginButton"
import * as Telegram from "../utils/telegram"
import axios from "axios"


export function TutorialTelegramLogin() {
    const { t } = useTranslation("common")
    const [login, setLogin] = useDefinedContext(LoginContext)

    const onLogin = useCallback(
        async (data: Telegram.LoginData) => {
            console.debug("[Telegram] Logged in successfully, now forwarding to the server...")
            const response = await axios.post("/api/login/telegram", data)
            console.info(response)
        }, 
        []
    )

    if (!login) {
        return <>
            <div>
                {t("introTelegramLogin")}
            </div>
            <TelegramLoginButton
                dataOnauth={onLogin}
                botName={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}
            />
        </>
    }
    else {
        return <>
            <div>
                
            </div>
        </>
    }
}