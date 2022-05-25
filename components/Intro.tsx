import { Trans, useTranslation } from "next-i18next"
import { LoginContext } from "../contexts/login"
import { useDefinedContext } from "../hooks/useDefinedContext"
import { LoginButton } from "./LoginButton"
import { TelegramUserLink } from "./TelegramUserLink"


export function Intro() {
    const {t} = useTranslation("common")
    const [login, setLogin] = useDefinedContext(LoginContext)

    const loginMessage = login ? (
            <Trans i18nKey="introTelegramLoggedIn">
                Sei connesso come <TelegramUserLink u={login}/>!
            </Trans>
        ) : (
            <Trans i18nKey="introTelegramLogin">
                Effettua il login con Telegram per iniziare a creare il tuo evento.
            </Trans>
        )
    

    return <>
        <p>
            {loginMessage}
        </p>
        <LoginButton
            botName="festaappbot"
        />
    </>
}