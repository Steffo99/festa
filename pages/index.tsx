import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';
import { ActionLoginTelegram } from '../components/ActionLoginTelegram';
import { ActionEventList } from '../components/ActionEventList';


export async function getStaticProps(context: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale ?? "it-IT", ["common"]))
        }
    }
}


export default function PageIndex() {
    const { t } = useTranslation("common")
    const [login, _] = useDefinedContext(LoginContext)

    return (
        <main id="page-index" className="page">
            <hgroup className="hero-titles">
                <h1>
                    {t("siteTitle")}
                </h1>
                <h2>
                    {t("siteSubtitle")}
                </h2>
            </hgroup>
            {login ?
                <ActionEventList
                    className="hero-action"
                />
            :
                <ActionLoginTelegram
                    className="hero-action"
                />
            }
        </main>
    )
}
