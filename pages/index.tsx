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
    const [working, setWorking] = useState<boolean>(false)
    const [error, setError] = useState<ApiError | null | undefined>(null)
    const onLogin = useTelegramToFestaCallback(setLogin, setError, setWorking)
    
    if(!login) return (
        <main id="page-index" className="page">
            <hgroup className="hero-titles">
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
            {error ? 
                <div className="hero-action negative">
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
                working ?
                    <div>
                        <p>
                            {t("telegramLoginWorking")}
                        </p>
                    </div>
                    :
                    <div className="hero-action">
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

    return (
        <main id="page-index" className="page">
            <hgroup className="hero-titles">
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("eventsSubtitleFirst")}
                </h2>
            </hgroup>
            <div className="hero-action">
                <label htmlFor="input-name">
                    <p>
                        {t("eventsInputDescriptionFirst")}
                    </p>
                </label>
                <form className="form-event-create">
                    <input 
                        id="input-name" 
                        placeholder={t("eventsInputName")}
                        type="text"
                    />
                    <input
                        id="input-submit"
                        type="submit"
                        aria-label={t("eventsInputSubmitLabel")}
                        value="→"
                        className="square-40 positive"
                    />
                </form>
            </div>
        </main>
    )
}
