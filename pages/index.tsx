import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';
import { ApiError } from '../types/api';
import { TelegramLoginButton } from "../components/TelegramLoginButton"
import { useTelegramToFestaCallback } from '../hooks/useTelegramToFestaCallback';


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


export default function PageIndex() {
    const { t } = useTranslation("common")
    const [login, setLogin] = useDefinedContext(LoginContext)
    const [error, setError] = useState<ApiError | null | undefined>(null)

    const onLogin = useTelegramToFestaCallback(setLogin, setError)

    return (
        login ? 
            <main className="page-index">
                <h1>
                    {t("siteTitle")}
                </h1>
            </main>
        :
            <main id="page-hero" className="page">
                <hgroup className="hgroup-hero">
                    <h1>
                        {t("siteTitle")}
                    </h1>
                    <h2>
                        {t("siteSubtitle")}
                    </h2>
                </hgroup>
                {
                    error ? 
                    <div className="negative">
                        <p>
                            {t("telegramLoginError")}
                        </p>
                        <p>
                            <code>
                                {JSON.stringify(error)}
                            </code>
                        </p>
                    </div>
                    :
                    <div>
                        <p>
                            {t("telegramLoginDescription")}
                        </p>
                        <TelegramLoginButton
                            dataOnauth={onLogin}
                            botName={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}
                        />
                    </div>
                }
            </main>
    )
}
