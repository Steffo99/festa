import { useTranslation } from "next-i18next"
import { LoginContext } from "./contexts/login"
import { useDefinedContext } from "../utils/definedContext"

export function LogoutLink() {
    const [login, setLogin] = useDefinedContext(LoginContext)
    const {t} = useTranslation("common")

    return (
        <small>
            (
            <a href="javascript:void(0)" onClick={() => setLogin(null)}>
                {t("introTelegramLogout")}
            </a>
            )
        </small>
    )
}