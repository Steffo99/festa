import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginContext } from '../contexts/login';
import { useDefinedContext } from '../utils/definedContext';
import { FormLoginTelegram } from '../components/FormLoginTelegram';
import { FormEventList } from '../components/FormEventList';


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
                <FormEventList
                    className="hero-action"
                />
            :
                <FormLoginTelegram
                    className="hero-action"
                />
            }
        </main>
    )
}
