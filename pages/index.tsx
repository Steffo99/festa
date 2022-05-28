import type { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Intro } from '../components/Intro';
import { TutorialTelegramLogin } from '../components/TutorialTelegramLogin';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';

export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}

const Page: NextPage = () => {
    const { t } = useTranslation("common")
    const [login, setLogin] = useDefinedContext(LoginContext)

    if (!login) {
        return (
            <main className="page-index">
                <hgroup>
                    <h1>
                        {t("siteTitle")}
                    </h1>
                    <h2>
                        {t("siteSubtitle")}
                    </h2>
                </hgroup>
                <div>
                    <TutorialTelegramLogin />
                </div>
            </main>
        )
    }

    return (
        <main className="page-index">
            <hgroup>
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
        </main>
    )
}

export default Page
