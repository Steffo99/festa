import { Trans, useTranslation } from "next-i18next"
import { LoginContext } from "../contexts/login"
import { useDefinedContext } from "../utils/definedContext"
import { InputSlug } from "./InputEventSlug"
import { LoginButton } from "./LoginButton"
import { LogoutLink } from "./LogoutLink"
import { TelegramUser } from "./TelegramUser"


export function Intro() {
    const {t} = useTranslation("common")
    const [login, _] = useDefinedContext(LoginContext)

    const loginMessage = login ? <>
            <Trans i18nKey="introTelegramLoggedIn">
                introTelegramLoggedIn(1: <TelegramUser u={login}/>)
            </Trans>
            <br/>
            <LogoutLink/>
        </> : <>
            {t("introTelegramLogin")}
        </>

    const input = login ? <>
        <p>
            {t("introCreateEvent")}
        </p>
        <form>
            {window.location.protocol}//
            {window.location.host}/events/
            <InputSlug
                placeholder={t("introCreateEventSlugPlaceholder")}
            />
            <button aria-label="Continue" className="input-square input-positive">
                →
            </button>
        </form>
    </> : <>
        <LoginButton
            botName="festaappbot"
        />
    </>

    return <>
        <p>
            {loginMessage}
        </p>
        {input}
    </>
}