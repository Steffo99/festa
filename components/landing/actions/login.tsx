import { useTranslation } from "next-i18next"
import { useAxiosRequest } from "../../auth/requests"
import { TelegramLoginButton } from "../../auth/telegram/loginButton"
import { ErrorBlock } from "../../generic/errors/renderers"
import { promiseMultiplexer } from "../../generic/loading/promise"
import { LoadingInline } from "../../generic/loading/renderers"
import { useDefinedContext } from "../../../utils/definedContext"
import { AuthContext } from "../../auth/base"
import { useRouter } from "next/router"


export const LandingActionLogin = () => {
    if (!process.env.NEXT_PUBLIC_TELEGRAM_USERNAME) {
        throw new Error("Server environment variable `NEXT_PUBLIC_TELEGRAM_USERNAME` is not set.")
    }

    const { t } = useTranslation()
    const [, setAuth] = useDefinedContext(AuthContext)

    return promiseMultiplexer({
        hook: useAxiosRequest({ method: "POST", url: "/api/auth/telegram" }),
        ready: ({ run }) => <>
            <p>
                {t("landingLoginTelegramDescription")}
            </p>
            <TelegramLoginButton
                botName={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME!}
                buttonSize="large"
                requestAccess={undefined}
                dataOnauth={(data) => run({ data })}
            />
        </>,
        pending: ({ }) => (
            <p>
                <LoadingInline text={t("landingLoginTelegramPending")} />
            </p>
        ),
        fulfilled: ({ result }) => {
            setAuth(result.data)

            return (
                <p>
                    <LoadingInline text={t("landingLoginTelegramFulfilled")} />
                </p>
            )
        },
        rejected: ({ error }) => (
            <p>
                <ErrorBlock text={t("landingLoginTelegramRejected")} error={error} />
            </p>
        ),
    })
}
